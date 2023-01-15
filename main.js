var list;
var il = false;
var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};
function LO() {
  il = true;
}
function start() {
  setTimeout(function () {
    if (il) {
      document.getElementById("IP").innerHTML = "Latest IP: "+list.IP;
    } else {
      start();
    }
  }, 2000);
}
function gen() {
  getJSON(
    "https://raw.githubusercontent.com/sparkles3421/stellarica-website/main/main.json",
    function (err, data) {
      if (err == null) {
        list = data;
        start();
      } else {
        setTimeout(function () {
          gen();
        }, 100);
      }
    }
  );
}
gen();
function copyIP() {
    if (list) {
        if (list.IP) {
            const type = "text/plain";
            const blob = new Blob([list.IP], { type });
            const cpp = [new ClipboardItem({ [type]: blob })];
            navigator.clipboard.write(cpp)
        }
    }
}
