let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitOutput = document.getElementById("bits");
let kboutput = document.getElementById("kbs");
let mboutput = document.getElementById("mbs");

let imageLink = "https://source.unsplash.com/random?topics=nature";

function showLoading() {
  document.getElementById("loader").style.display = "block";
  document.getElementById("status").style.display = "block";
}

function hideLoading() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("status").style.display = "none";
}
document.getElementById("comparison").style.display = "none";

function handleCheckSpeedButtonClick() {
  init();
}

const checkSpeedButton = document.getElementById("checkSpeedButton");
checkSpeedButton.addEventListener("click", handleCheckSpeedButtonClick);

image.onload = async function () {
  endTime = new Date().getTime();
  showLoading();
  await fetch(imageLink).then((response) => {
    imageSize = response.headers.get("content-length");
    calculateSpeed();
    hideLoading();
    document.getElementById("comparison").style.display = "block";
  });
};

function calculateSpeed() {
  let timeDuration = (endTime - startTime) / 1000;
  let loadedBits = imageSize * 8;
  let speedInBps = (loadedBits / timeDuration).toFixed(2);
  let speedInKbps = (speedInBps / 1024).toFixed(2);
  let speedInMbps = (speedInKbps / 1024).toFixed(2);
  bitOutput.innerHTML = `Speed In Bits: ${speedInBps}`;
  kboutput.innerHTML = `Speed In Kbs: ${speedInKbps}`;
  mboutput.innerHTML = `Speed In Mbs: ${speedInMbps}`;
  const benchmarkSpeedMbps = 50;
  const comparisonMessage = getComparisonMessage(speedInMbps, benchmarkSpeedMbps);
  document.getElementById("comparison").innerHTML = `<span>${comparisonMessage}</span>`;
}

function getComparisonMessage(userSpeedMbps, benchmarkSpeedMbps) {
  if (userSpeedMbps > benchmarkSpeedMbps) {
    return `Your speed is ${Math.round(userSpeedMbps / benchmarkSpeedMbps)} times faster than the average global speed!!`;
  } else if (userSpeedMbps < benchmarkSpeedMbps) {
    return `Your speed is ${Math.round(benchmarkSpeedMbps / userSpeedMbps)} times slower than the average global speed!!`;
  } else {
    return "Your speed is about the same as the average global speed ";
  }
}

const init = async () => {
  startTime = new Date().getTime();
  image.src = imageLink;
};

window.onload = () => init();