//Creating  a wavesurfer instance, passing the container selector along with some options like progress color and wave color
var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
  });
  
  //Loading the audio file you want to play
  wavesurfer.load('satie.mp3');
  
  // You can also load wav files if you want
  //wavesurfer.load('audio/songaudio.wav');
  
  //This is the event you play the wavesurver instance i.e when wavesurfer ready event
  wavesurfer.on('ready', function() {
    wavesurfer.play();
  });
  
  wavesurfer.registerPlugin(
    Spectrogram.create({
      labels: true,
      height: 200,
      splitChannels: true,
    }),
  )