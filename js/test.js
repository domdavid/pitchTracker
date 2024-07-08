import WaveSurfer from 'wavesurfer.js'

//Creating  a wavesurfer instance, passing the container selector along with some options like progress color and wave color
const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple',
    url: 'satie.mp3'
  });
  
  //Loading the audio file you want to play
  // wavesurfer.load('satie.mp3');
  
  wavesurfer.registerPlugin(
    Spectrogram.create({
      labels: true,
      height: 200,
      splitChannels: true,
    }),
  )


  // You can also load wav files if you want
  //wavesurfer.load('audio/songaudio.wav');
  
  //This is the event you play the wavesurver instance i.e when wavesurfer ready event
  wavesurfer.on('ready', function() {
    wavesurfer.play();
  });
  
  