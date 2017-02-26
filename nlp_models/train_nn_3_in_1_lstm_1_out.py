
# coding: utf-8

# In[147]:

import gensim
from keras.models import Sequential
from keras.layers import Dense, LSTM, Embedding
from keras.callbacks import ModelCheckpoint
import pandas as pd
import numpy as np


# ### Parameters

# In[148]:

filename = 'test.txt'
#filename = 'en_US.blogs.txt'
#trainset_prefix = 'part001'
trainset_prefix = ''

IN_SEQ_LENGTH = 3
OUT_SEQ_LENGTH = 1
EMBEDDING_DIM = 64
HIDDEN_LAYER_1 = 1024
MODEL_NAME = 'nn_3_in_1_lstm_1_out'

N_SAMPLES = 10000000
N_EPOCH = 4
N_BATCH = 500


# In[149]:

META_EMPTY = '<<<!EMP!>>>'


# ### Load corpora

# In[150]:

corpora = gensim.corpora.Dictionary.load('./data/'+filename+'.corpora.dat')
vocab_size = len(corpora)
print('Number of words in corpora: %d'%(vocab_size))
tmp = list(corpora.items())


# ### Set network configuration

# In[151]:

model = Sequential()
model.add( Embedding(input_dim=vocab_size, output_dim=EMBEDDING_DIM, input_length=IN_SEQ_LENGTH) )
model.add( LSTM(HIDDEN_LAYER_1, return_sequences=False) )

model.add( Dense(output_dim=vocab_size, activation='softmax') )


# In[152]:

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])


# In[153]:

model.summary()


# In[154]:

fname = './data/' + MODEL_NAME + '.json'
with open(fname, mode='w') as f:
    f.write(model.to_json())


# ### Load train set

# In[155]:

print("Loading train set...")


# In[156]:

train_X = pd.read_csv('./data/' + filename + '.' + str(IN_SEQ_LENGTH) + '_in_' + str(OUT_SEQ_LENGTH) + '_out.train_X.csv')
train_Y = pd.read_csv('./data/' + filename + '.' + str(IN_SEQ_LENGTH) + '_in_' + str(OUT_SEQ_LENGTH) + '_out.train_Y.csv')


# In[157]:

# Trancate dataset
N_SAMPLES = min(N_SAMPLES, train_X.shape[0])

train_X = train_X.loc[:N_SAMPLES,:]
train_Y = train_Y.loc[:N_SAMPLES,:]


# In[158]:

print('Train set X, Y:')
print( train_X.shape, train_Y.shape )


# ### Train the network

# In[159]:

def batch_generator(X, y, batch_size):
    number_of_batches = np.ceil(X.shape[0]/batch_size)
    counter = 0
    sample_index = np.arange(X.shape[0])
    while True:
        batch_index = sample_index[batch_size*counter:batch_size*(counter+1)]
        X_batch = X[batch_index,:]
        y_batch = y[batch_index]
        counter += 1
        yield (X_batch, y_batch)
        if (counter == number_of_batches):
            counter = 0


# In[160]:

#checkname = './data/' + filename + '.' + MODEL_NAME + '.weights.hdf5'
checkname  = './data/' + filename + '.' + MODEL_NAME + '.weights-epoch-{epoch:02d}-loss-{loss:.2f}-acc-{acc:.2f}.hdf5'
checkpoint = ModelCheckpoint(checkname, monitor='loss', verbose=1, save_best_only=True, mode='min')

model.fit_generator(generator = batch_generator(train_X.as_matrix(), train_Y.as_matrix(), N_BATCH),
                    nb_epoch = N_EPOCH,
                    samples_per_epoch = train_X.shape[0],
                    callbacks=[checkpoint],
                    verbose = 1)

#model.fit(train_X.as_matrix(), train_Y.as_matrix(), batch_size=500, nb_epoch=N_EPOCH, callbacks=[checkpoint])


# #scores = model.evaluate(train_X, train_Y, verbose=0)
# #print("Model Accuracy: %.2f%%" % (scores[1]*100))

# In[ ]:



