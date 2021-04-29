

export const utils = {

    // todo по факту надо 4 вида респонсов:
    //  ОК => 200 Ok
    //  серевер прислал ошибку (осмысленная ошибка, типа вот здесь в форме неправильный name) => 400 Bad request
    //  сервер прислал что-то неизвестное (просто ошибка)
    //  сервер не отвечает
    //  + можно ещё 401 Unauthorized как отдельная ошибка

    onErr(requestName, err, actionMap){
        //console.log(err);

        // todo обработка ошибки типа
        // net::ERR_ABORTED 405
        // net::ERR_CONNECTION_REFUSED

        const action = actionMap.get("any-err");
        if (action) action();

        this.onResponse(requestName, err.response, actionMap);
    },

    onResponse(requestName, response, actionMap){
        //console.log(response);
        let status = response ? response.status : -1;
        //debugger
        switch (status) {
            case -1:
                console.log(`${requestName} request: Error: Server doesn't respond`);
                break;
            case 200:
                console.log(`${requestName} request: 200 Success`);
                break;
            case 400:
                console.log(`${requestName} request: 400 Bad request`)
                break;
            case 401:
                console.log(`${requestName} request: 401 Unauthorized`);
                break;
            default:
                console.log(`${requestName} request: ${status}: ???`);
                status = -2;
                break;
        }

        const action = actionMap.get(status);
        if (action) action();
    },

}