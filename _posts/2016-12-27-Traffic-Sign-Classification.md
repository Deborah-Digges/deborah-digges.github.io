---
title: Traffic Sign Classification using Deep Learning
layout: post
comments: True
---

The second project in the [Self Driving Car Nano-degree](https://www.udacity.com/course/self-driving-car-engineer-nanodegree--nd013) was the application of deep learning to the problem of traffic sign classification. Identifying traffic signs correctly and taking appropriate action is crucial to the operation of an autonomous vehicle.

The project was markedly more difficult than the previous one of lane detection for several reasons including the steep learning curve of the [Tensorflow](https://www.tensorflow.org/) deep learning framework, the vast number of hyper-parameters that deep learning models have to tune and the extremely slow turn around time for model validation on CPUs which necessitates the setup of an environment with a powerful GPU either physically or using a cloud provider.

We were provided with the [German Traffic Signs](http://benchmark.ini.rub.de/?section=gtsrb&subsection=dataset#Downloads) data set that contained about 40k training examples and 12k testing examples. The problem is one of classification which aims to assign the right class to a new image of a traffic sign by training on the provided pairs of traffic sign images and their labels. The project was broken down into:

### 1. Exploratory Data Analysis
The provided training data was examined mainly for the distribution of the various classes. The classes were found to be highly imbalanced indicating the need for data generation for the under-represented classes.

### 2. Data Pre-processing and Augmentation
The images input to the neural network went through a few pre-processing steps to help the gradient descent optimization for training the network. Pre-processing included:

i.  **Grey Scale Conversion**

ii. **Centering of images** : The mean pixel value was subtracted from each pixel of the image to center the data around the origin

iii. **Normalization** : This was done by dividing each dimension by its standard deviation once it was zero-centered. This is not strictly needed for images because the relative scales of pixels are already approximately equal. This process causes each feature to have a similar range so that our gradients don't go out of control (and that we only need one global learning rate multiplier).

Additional data for under-represented classes was generated through a combination of the following techniques:

i.  **Translation**

ii.  **Rotation**

iii. **Affine transformations**

### 3. Definition of CNN Architecture

![Architecture]({{site.url}}/images/NN.jpg)
<div class="align-center">Fig: The Count Down Begins</div>


### 4. Training the model

### 5. Testing on real world examples
http://yann.lecun.com/exdb/publis/pdf/sermanet-ijcnn-11.pdf

https://github.com/Deborah-Digges/SDC-ND/blob/master/P2-traffic-signs/Traffic_Signs_Recognition.ipynb