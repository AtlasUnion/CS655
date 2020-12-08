// public ip address, listening on port: 192.170.230.102:8080
var i = 0;
function y(hashlist) {
    const data = new URLSearchParams(); 
    data.append('md5hash', hashlist[i]); // hashling is the variable
    fetch('/api/processform', {method: 'post', body: data})
    //document.write(hashlist[i] + "</br>");
    i = i + 1;
}


// a list of 100 different hashes
var tester = ['sR7dKnvZjGBSo9xEZ3P6Tg==', 'CJm4hBOt3YhbQQ3aBS5Alg==', '3c8CBTGnJMgwVcw7Wo+Qug==', 'hogRhtzqtXZD6HSn6ixMBw==', '4BkleK2DJsquKhuapEjJ+g==', 'NAX5vQlGTYMXm6ttHTxcKw==', 'MR0wF0RKFyCoxzYIA5yhKg==', 'bdRdvYyeRDZEbe1SQqhJlw==', 'l3y5T6t6CsIqfzEvSJ93Nw==', 'dkpOyBAayHaDNzE8SSLmzg==', 'p9axy/Ayw9mB/1wN2jiSjg==', 'o2T+Wlod+fCI1CE4hWiYrA==', 'LGJcA00fTINrwLQ3ZKitRQ==', 'G9gp3PvBvCeU9IgtN3xPEQ==', 'fQI56ZIsvjcigG4HKBYwqA==', 'p/ZTna6KVWZfuUOlBCqn1Q==', 'o/zRFRf1IpCoSjB2G1R84A==', 'nFqtJPGNMEaE1WCFHN6gBQ==', '8Zo0j0y3zbaks/0CtF+uFQ==', 'Z+46jwaqKuoHimTfLLJpng==', 'CnqCYI3wAKpSoZbs3Rpetg==', '63Oq4hITTwTavsNp3EZJ/A==', '4xaJ/3XGYlMrD6jd2yuIeQ==', 'aTwdPLU0WrEaDZZZFbywDg==', 'mjMs8pFNQVJTBjWWwAtQ3w==', 'x4eamweKPJtWJ9Gc025Q1w==', '+S7CsdCeDH1jhGbcbMSuRQ==', 'nPeS66oDzbW/afZy9T6arg==', 'fa++d+Hati6joJlbgifMfg==', 'lezKdiQb6PfSWifH3HOWAA==', 'e2FIen23HmaD9ejGUf6OXg==', 'YBm1/EibpYvrtdVIfn9VNQ==', '0CJCeLLEKB2DlQVeC88+aQ==', 'OFtnzr20fYgIyQqEst3Jhw==', '2BTNj2BSwTGJHvUyl3TUGQ==', 'VKmeSN2nChcoyvbnyLwSOg==', 'X6P4KT6LLHvIF5SHc09Qdw==', 'VWsLIc1L1CxX5ITcXk9vUw==', 'UvihFwFrIFB/DmieZDKr2g==', 'PjgTwvOFM60OgqtyID4RRA==', 'OClV3NdN1zEXp9osrWk05A==', 'pbDHPIQVGOOeKyE9fG62gQ==', 'eUV3eJGb34ldbDcLi7itsg==', 'xv+r5kKnaapOruzEKKitew==', 'VIhHsyn/lizma+auDvYXQQ==', 'u+tOnrvgxDWeFlmPEhrahA==', 'VeoIRS1PThP2QeX93d9vbg==', 'vzBgSmgRgldSyKIzjrrQdw==', 'RuXnDgXSqdu/VbD8RN1/2g==', 'bV0fv7bqM+er3CxFlWy08w==', 'h+8KP8BwMqB+yGw/BIPkKw==', 'lyLKAzDG+WtiK0imM/rfzg==', 'Kqp65GN+D0eWuz87XUgQgw==', 'zy2CiUDFtnBAtVWHaJkvgQ==', '9PlDOezxKJCmpB02gzZ/jg==', 'E6Tv4f3J/S4zX0Y8AjdVcQ==', 'gZEWuNrySZn+UwQxPAJbAA==', 'Kgo5NF0erUrzf8t2NH7sJQ==', 'tqRLHyiMeDcc0NVKhitfzA==', 'F+ZtednFAIeALc5PESXyyQ==', 'eUBieaWndrxwFWLdi/GqRw==', '6XYYkQMZVdIux1dbxR8oYA==', 'khEdHj9OOehDS3DUauAhNw==', 'aMGeYNFYKBj/6N+MTMFq3Q==', 'mhejObiWfoZ/Ixh5dq9Fdg==', 'rNBwayi+094ZHidAPwExPQ==', 'hdXk56aGF+6JiqQHRMWMag==', 'JfO/aA6Lr+zX1CGU3OmdCQ==', 'w35SxKSOmubS2KFaD6a/iw==', 'VSFNnmp9w1d1FZiFPc95HQ==', 'oFekaRc/UW4mGluLGSipog==', 'ZK2oldSA07AWCfWGgYmjtg==', '2ZhJ5z6jEXMjkRzu1LcPYg==', 'ilgqAeIO3eCFnAqIxVUJYA==', 'xbqfiMJICcXZcC1UO6t2tA==', 'ay3cdmk/heAtY4HqVqCpYA==', 'MT5nXdpqIt0Y1yV3lDozxA==', 'ZXD4WGGbU17Nl7RqGX1iEw==', '7jSfdnfnKXAhOPdD4yMrpQ==', 'zl7Dxz3zPZVgYcuwhe3RSA==', '1f86ydXnPhyYDtXRji9SKg==', 'G9yuNodsuBGbDWxuAgRezQ==', 'ULvPVzTy0E4BNx2aiNpFNg==', 'ViMx7MJ8jhxDaZd5jEa4lQ==', 'qaZZfxUOLRUhiFjbRtdYFA==', 'DkCyRLLla12UHHvuhRZQ0Q==', 'IUYljOFxwd4oEC78xXsKhA==', 'CxihM35DSIzT3NbL39fMGA==', 'vfO49RTBa7UMVFJGjpFavQ==', '6sB7p992XnjMkZfx9hvsLg==', 'PwfrIluVinXnxIrw3a7Zkg==', 'Vys+/w5l1UGIvstYmB1npw==', 'WgqG+1/aUvoOCoj5vmfC1Q==', '/cmnt0BADg33LXERjYGjVw==', 'Zo3vE6zZ1plp5cZEIj66tg==', 'd42SL6om79f/IRlh/smgKw==', 'k+l7IXLhrPXHK/pX01ZAvw==', 'Lal+28Y9gw0vWGCQ5jBSDQ==', 'EwXcYE3GwN9QF8BJPZhKKA==', 'AC2SxvF4RmkQDiHQ9tCFlg=='];

var eyedee = setInterval(function(){ y(tester); if(i===tester.length){clearInterval(eyedee);} }, 1000);



//var five = ["9qYmMWfJLehkSsmYs8Tk0Q==", "ghLBU/D1I6/FSf7Q5Ekh+g==", "SuPVH8k72CpNCXdgEsxoYA==", "WLmiqUojiD7a2yaDBoRRDw==", "bG+OQ+KWqYiE+Q5Kn4XOHw=="];
