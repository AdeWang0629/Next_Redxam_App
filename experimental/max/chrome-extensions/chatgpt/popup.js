document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: 'document.body.innerText' },
      function (results) {
        var wordCount = {};
        var words = results[0].split(/\s+/);
        for (var i = 0; i < words.length; i++) {
          var word = words[i].toLowerCase();
          if (wordCount[word] === undefined) {
            wordCount[word] = 1;
          } else {
            wordCount[word]++;
          }
        }
        var items = Object.keys(wordCount).map(function (key) {
          return [key, wordCount[key]];
        });
        items.sort(function (first, second) {
          return second[1] - first[1];
        });
        var table = document.getElementById('word-count');
        for (var i = 0; i < items.length; i++) {
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          cell1.innerHTML = items[i][0];
          cell2.innerHTML = items[i][1];
        }
      }
    );
  });
});
