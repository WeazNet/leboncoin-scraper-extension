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
      browser.tabs.executeScript({ file: 'content.js' }).then(function(results) {
        downloadJSON(results[0]);
      });
    });
  });