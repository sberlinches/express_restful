// http://jsonapi.org/
class ResponseHelper {

    private url: string;
    private method: string;
    private id: string;
    private status: number;
    private response = { status: 0, body: {} };
    private bodyData = { data: {} };
    private bodyErrors = { errors: [] };
    private bodyError = { id: '', status: '', code: '', title: '' };
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
        'not_found': {
            status: 404,
            title: 'Not found'
        },
        'bad_username': {
            status: 422,
            title: 'Bad username'
        },
        'bad_password': {
            status: 422,
            title: 'Bad password'
        },
        'internal_server_error': {
            status: 500,
            title: 'Internal server error'
        },
        'db_error': {
            status: 500,
            title: 'Data base error'
        }
    }; // TODO: External config file

    constructor(
        private Request: any
    ) {
        this.url = Request.url;
        this.method = Request.method;
        this.id = this.generateId();
    }

    public getResponse(code: string, data?: any):any {
        this.status = this.codes[code].status;
        let body;

        if(this.status >= 200 && this.status < 300) {
            body = this.prepareBodyData(data);
        } else {
            body = this.prepareBodyError(code);
        }

        return this.prepareResponse(body);
    }

    private prepareBodyData(data?: any):any {
        this.bodyData.data = data;
        return this.bodyData;
    }

    private prepareBodyError(code: string):any {
        this.bodyError.id = this.id;
        this.bodyError.status = this.status.toString();
        this.bodyError.code = code;
        this.bodyError.title = this.codes[code].title;
        this.bodyErrors.errors.push(this.bodyError);

        return this.bodyErrors;
    }

    private prepareResponse(body: any):any {
        this.response.status = this.status;
        this.response.body = body;
        return this.response;
    }

    private generateId():string {
        let pieces = this.url.split('/');
        pieces.shift();
        pieces.push(this.method);
        return pieces.join('_');
    }
}

export = ResponseHelper;