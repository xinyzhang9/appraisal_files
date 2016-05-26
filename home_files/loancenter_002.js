///use this file to put any shared functions from LC to use in consumerSite
///use as much typeScript typing as possible
var loancenter;
(function (loancenter) {
    function populateDefaultValueClosingDate(closingDate) {
        if (!closingDate) {
            closingDate = new srv.cls.LoanDateViewModel();
        }
        closingDate.dateValue = moment().add(30, 'days').format("YYYY-MM-DDTHH:mm:ss");
        return closingDate;
    }
    loancenter.populateDefaultValueClosingDate = populateDefaultValueClosingDate;
})(loancenter || (loancenter = {}));
//# sourceMappingURL=loancenter.functions.js.map