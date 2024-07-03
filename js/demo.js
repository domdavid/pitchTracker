// Create an array of SVG path strings, each defining a line starting from a specific point on the SVG canvas
const PATH_ARRAY = Array.from({ length: 255 }, (_, index) => `M ${index},255 l 0,-0`);

// Function to handle successful audio access
const handleAudioStream = (audioStream) => {
  // Create an AudioContext to manage audio operations
  const audioContext = new AudioContext();

  // Create an AnalyserNode to extract frequency data from the audio stream
  const analyser = audioContext.createAnalyser();

  // Create a source node from the audio stream
  const source = audioContext.createMediaStreamSource(audioStream);

  // Connect the source to the analyser
  source.connect(analyser);

  // Set the FFT (Fast Fourier Transform) size for frequency analysis
  analyser.fftSize = 1024;

  // Create a Uint8Array to store frequency data
  const frequencyArray = new Uint8Array(analyser.frequencyBinCount);

  // Function to continuously update the visual representation of audio frequencies
  const updateVisualization = () => {
    // Find the container in the HTML document where the SVG visualization will be rendered
    const container = document.querySelector('#mask');

    // Clear the container for new visualizations
    container.innerHTML = '';

    // Request animation frame for smooth updates
    requestAnimationFrame(updateVisualization);

    // Get frequency data into the frequencyArray
    analyser.getByteFrequencyData(frequencyArray);

    // Map the PATH_ARRAY with frequency data to create SVG path elements
    PATH_ARRAY.forEach((path, index) => {
      // Calculate the new length of the SVG path based on frequency data
      const newLength = Math.floor(frequencyArray[index]) - (Math.floor(frequencyArray[index]) % 5);

      // Create an SVG path element
      const element = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      // Set attributes for the SVG path
      element.setAttribute('d', `M ${index},255 l 0,-${newLength / 5}`);

      // Append the SVG path to the container
      container.appendChild(element);
    });
  };

  // Start the continuous visualization
  updateVisualization();
};

// Function to handle errors if audio access fails
const handleAudioError = (error) => {
  alert(error);
};

// Main function to initiate audio stream access
const initializeAudioVisualization = () => {
  // Try to access the user's audio input
  // navigator.getUserMedia().getUserMedia({ audio: true, video: false }, handleAudioStream, handleAudioError);
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      { audio: true, video: { width: 1280, height: 720 } },
      (stream) => {
        const video = document.querySelector("video");
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
          video.play();
        };
      },
      (err) => {
        console.error(`The following error occurred: ${err.name}`);
      },
    );
  } else {
    console.log("getUserMedia not supported");
  }


};

// Call the main function to begin the audio stream access
initializeAudioVisualization();
