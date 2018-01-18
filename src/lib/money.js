function formatMoney(a,c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = a < 0 ? "-" : "",
        i = String(parseInt(a = Math.abs(Number(a) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(a - i).toFixed(c).slice(2) : "");
};

module.exports = {
    formatMoney : function (a,c, d, t){
        return formatMoney(a,c,d,t);
    }
}