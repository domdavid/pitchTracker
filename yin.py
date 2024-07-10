from scipy import signal
import numpy as np
import matplotlib.pyplot as plt
import scipy.io.wavfile as wav

#1 hz signal for testing
def f(x):
  f_0 = 1
  return np.sin(x*np.pi * 2 * f_0)

#2 auto correlation function
# f - signal
# W - window
# t - time step
# lag - shift
def ACF (f, W, t, lag):
  return np.sum(
      f[t : t+W] *
      f[lag + t : lag + t + W]
  )


 
def DF(f, W, t, lag):
  return ACF(f, W, t, 0)\
  + ACF(f, W, t + lag, 0)\
  - 2 * ACF(f, W, t, lag)


# f - signal
# W - window
# t - time step
# bounds - start and end of autocorrelation
def detect_pitch(f, W, t, sample_rate, bounds):
  # list consisting all autocorrelation values
  ACF_vals = [DF(f, W, t, i) for i in range(*bounds)]
  sample = np.argmax(DF_vals) + bounds[0]
  return sample_rate / sample

def main():
  sample_rate = 500
  start = 0
  end = 5
  num_samples = int(sample_rate*(end - start) + 1)
  window_size = 200
  bounds = [20, num_samples//2]
  x = np.linspace(start, end, num_samples)
  print(detect_pitch(f(x), window_size, x, sample_rate, bounds))

main()