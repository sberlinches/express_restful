// http://jsonapi.org/
class ResponseHelper {

    private route: string;
    private method: string;
    private id: string;
    private status: number;
    private response = { status: 0, body: {} };
    private bodyData = { data: {} };
    private bodyErrors = { errors: { id: '', status: '', code: '', title: '' } };
    private codes = {
        'ok': {
            status: 200,
            title: 'OK'
        },
        'created': {
            status: 201,
            title: 'Created'
        },
        'insufficient_parameters': {
            status: 400,
            title: 'Insufficient parameters'
        },
        'data_not_provided': {
            status: 400,
            title: 'Data not provided'
        },
        'bad_username': {
            status: 422,
            title: 'Bad username'
        },
        'bad_password': {
            status: 422,
            title: 'Bad password'
        },
        'db_error': {
            status: 500,
            title: 'Data base error'
        }
    }; // TODO: External config file

    constructor(
        private Route: string,
        private Method: string
    ) {
        this.route = Route;
        this.method = Method;
        this.id = this.prepareId();
    }

    public getResponse(code: string, data?: any) {
        this.status = this.codes[code].status;
        let body;

        if(this.status >= 200 && this.status < 300) {
            body = this.prepareBodyData(data);
        } else {
            body = this.prepareBodyError(code, data);
        }

        return this.prepareResponse(body);
    }

    private prepareBodyData(data: any) {
        this.bodyData.data = data;
        return this.bodyData;
    }

    private prepareBodyError(code: string, data: any) {
        this.bodyErrors.errors.id = this.id;
        this.bodyErrors.errors.status = this.status.toString();
        this.bodyErrors.errors.code = code;
        this.bodyErrors.errors.title = this.codes[code].title;
        return this.bodyErrors;
    }

    private prepareResponse(body: any) {
        this.response.status = this.status;
        this.response.body = body;
        return this.response;
    }

    private prepareId():string {
        let pieces = this.route.split('/');
        pieces.shift();
        pieces.push(this.method);
        return pieces.join('_');
    }
}

export = ResponseHelper;