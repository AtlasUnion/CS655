// use the following code in a browser console or node

function y() {
    const data = new URLSearchParams(); 
    data.append('md5hash', 'whatever'); // TODO: replace with actual hash
    fetch('/api/processform', {method: 'post', body: data})
}

setInterval(y, 1000)