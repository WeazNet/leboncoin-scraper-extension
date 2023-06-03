function downloadJSON(data) {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    let title = data["title"];
    title = title.replaceAll(' ', '-');
    title += "-data.json";
    a.download = title;
    a.href = url;
    a.click();
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('download-button').addEventListener('click', function() {
      let data = {};
      browser.tabs.executeScript({ file: 'openDescription.js'})
      .then(() => {
        browser.tabs.executeScript({ file: 'getContent.js' })
        .then((results) => {
          data = results[0];
          browser.tabs.executeScript({ file: 'getImages.js' })
          .then((images) => {
            data.images = images[0];
            downloadJSON(data);
          })
          .catch((err) => {
            document.getElementById("error").textContent = err;
          });
        })
        .catch((err) => {
          document.getElementById("error").textContent = err;
        });
      });   
    });
  });