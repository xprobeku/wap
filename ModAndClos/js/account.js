(function () {
    "use strict";
    let accountInfoList = [];

    let account = {
        createAccount: function(a, b){
            this.acName = a;
            this.balance = b;
            this.getAccount = function() {
                return 'Account Name:  ' + this.acName + '  Balance:  ' + this.balance;
            }
        }
    };

    let createAcc = function (){
        let allAcc = '';
        accountInfoList.push(new account.createAccount($('#newaccount').val(),$('#newdeposit').val()));
        accountInfoList.forEach(e => {
            allAcc+=e.getAccount() + "\n";
        });
        $('#textArea').val(allAcc);
        $('#newaccount').val("");
        $('#newdeposit').val("");
    };

    window.onload = function () {
        $('#btnNew').click(createAcc);
    }
})();