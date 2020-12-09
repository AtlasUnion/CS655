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
var tester = ['wG3Kvab2DbtqY38f/fs6GA==', 'w9CS471D2oKjYqqqV3Rqqg==', 'uFMsnCH+D+irCWN2LWGqjA==', 'dXwesWdgUAngVZaAlZsI2A==', 'I43zkpKuY+rVjizv/l/cgg==', 'ioXpbV4fhBVgPs1DI3gotA==', 'iQiOym4A82rP2NlRHwcX0Q==', '0o7KG0HuVR0xE+W3hW5K0Q==', 'lvMRnp+jiwuq/XSNB6jC/A==', 'VBcsUDafUiDn/SVYIe8TQQ==', 'vTw7oWO31fc9mOYjoBv9mg==', '+VYhc/OFmFhAOgyXu16uYA==', 'bPpjI71D/pk+O927hlpA5g==', 'ICjSlgBfWwysge+zxDHxuw==', 'CPD2yMY6udd/oN1P17q4ag==', 'TY06Jxy3jMisOChfxZXeaw==', 'oFzkuwAt20gONYDYhWYLWw==', 'CBD9EPah6S6FZlxJlO8lWg==', 'v/JlQgMXa6IbMSWtXJDHfw==', 'kHH/FuNp1aqg+uDBuCafLQ==', 'GdG8TWUZRgACt33krlLaJw==', 'liHPzZLTyDu5AG84jLTIWQ==', 'jGG+r9a+iFIinmh0Qn+teg==', 'CmXjDpyJTHsXSCPZh8Gdfw==', 'fNcIBEG0RvXrmMAp3KF1Ig==', 'x5Bk9p2+0YxXa12yPYNwpQ==', '1a2yGr0/iAh34f1y5hosOw==', 'GZTIngbau6D5A+FDJ3TNSw==', 'Kxhq4IF+Sdoasjb/nXZkjA==', 'ZRcVPSUgsXpxXpd5awFbtA==', 'Hnh3YzRResI3HpRtAPUkLw==', 'C43CXske5bf98hCOrgzAQQ==', '4Xnoojtn9g/oihkFESM0cA==', 'CcJIpmOKwuLOnyEs3Uxk8w==', 'ybeInZ523mXx7gnSU9n3xQ==', '/siOpfRozkX5Ob/4Fodznw==', 'wMzNAR4pkQZHnyPU0Mjs9g==', 'BoEuBRxg0S2Y3o3U7c5bgA==', '1Um6+EMfxQeNkt/nvdtkGg==', 'tFOqb+spb1m+PhRWhIeQ8A==', 'JgocnsJO7m2J75diQfJbkA==', 'okMNztyFm28osyUNa1gCQg==', '912ebzWu1Z4ZMVmPVyZLWg==', 't2bRPO94HioYEDSXhYkOIg==', 'NKXYxUri4MEPXdXwjkMOug==', 'N8RdqHmwfOSL05ZTFu2ikw==', 'sFl7kCye8nH7SjFeRSk2fQ==', '1lBGNPIdlbBbDHAgO72Ugg==', 'A4AC2hRk+kNDuTG4IzOubw==', 'rtvvTY6SxOV/KAn1ZbDn9g==', '5RwDPp4OwiYHTy6ZIQROvQ==', 'GGp8P5N8ek3UmU7yBk5Mog==', 'XsyJrsEgyUM+s71xmX5cNQ==', 'eWrh6Tj+hw24+qGww31zmQ==', 'KseI3+BDXnYVZoElT6c18w==', 'cmqb/SnPcoh05BdL6N02VQ==', 'w3TNyVHqS7Ct5nJZ2gtOLA==', 'Eb8C3HGEmbk8kUOAl6x8lA==', 'Q3yGJn4JhSPtGnzSipnOpA==', 'uiwV2p0v/JuZR5TZ8Vwh8g==', 'zdy8GtCRnGhUr87XJvoEPQ==', 'C+QTTWTT8IjkoT56VJuv6w==', '3YBW9FqaU1Zu2V55Ogvw4Q==', 'j63tXLFrIwzJ6/IbKIbG7g==', 'bGKStm8P71lu4AUTp8iZXw==', 'eL3q3JuAlZQMTzwkAnKcJA==', '8gXd6iMebQdTEA8KkMgH5w==', 'I6ENBQZTYrHTneWQx4NhxA==', 'o8nbopIcqQ1tdiZvU9q8vg==', 'rVJEDwQYJDZK9u0sCSlScg==', 'vOTYpTBe5aNVPGlnCE8bnw==', 'Y4owmQo3Fgol+1COXfYwvA==', 'H02nyENCYC5TmA0r4RGpPg==', 'V0p/EIPVtzGbykxrgNi/CA==', 'fnr68aRe/qpvdIrHZbTAxw==', 'P4tDUtyFSuz9n9uR1c0Pug==', '8Utl0ktaK1vMRY6/aPPCjw==', '8PV/SNBV61aWzA5+9ERjxA==', '6k5upRE60aJ4hB6hDfXBOw==', 'pkqDMIZi284LwXAs7UZcXw==', '8QyXwNQes/9gmpCobnFmbg==', '/Ll4VSn04XvmcxByt4wtPg==', 'UxOU42pHjjHi7T+SXd22Tw==', '8Nc1nnkhBw0gWyBiY9C7oA==', 'qWyXhTkyYOpOL/0p1z2JDg==', 'iXuu6BnnaBmJxaqA9DTrMg==', 'I5g1RoZhcRScqMXXsYMHMQ==', 'eURGE41+rYXUyNjrsFz9XQ==', 'mfuwI8bMByFiN23aQ43wuw==', 'ZEmf7iHaF2c3yNONADciDQ==', 'e4Sn7D4JYQgEbls+fFIFdg==', 'jYolFGWc5ZIHNKqzOBZKjg==', 'xh2750p2u+W9RcbseTEhWw==', 'f2+zmD+IUvKQniqv8slYjg==', 't2EKBcWanl7hZq/3TyVjrQ==', '+s2SHtpetxUJjYJJkeqnZw==', 'TlqtdDb3MkIjQD0+v/tdqA==', '07kevMR5YtGwSEjUJFMXRQ==', 'pYcMDozmMbYoF/dtBD2nag==', 'aXMWa62xtbehMDZLp79Hrw=='];

var eyedee = setInterval(function(){ y(tester); if(i===tester.length){clearInterval(eyedee);} }, 10;



//var five = ["9qYmMWfJLehkSsmYs8Tk0Q==", "ghLBU/D1I6/FSf7Q5Ekh+g==", "SuPVH8k72CpNCXdgEsxoYA==", "WLmiqUojiD7a2yaDBoRRDw==", "bG+OQ+KWqYiE+Q5Kn4XOHw=="];
