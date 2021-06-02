import { UserService } from '../../../../service/clouddisk/user';

const domain = 'http://192.168.199.53:9011';
const param = { username: 'pzr', password: '123456' };

describe('UserService', () => {
    it('constructor', () => {
        var queryServices = new UserService({ domain: domain });
        expect(queryServices).not.toBeNull();
    });

    it('processAsync', (done) => {
        let headers = new Headers();
        // headers.append("Authorization");
        let user = new UserService({ domain, headers });

        let querySuccess = (res) => {
            console.log('success', res);
            done();
        };
        let queryFail = (error) => {
            console.log('fail', error);
            done();
        };

        expect(user).not.toBeNull();

        spyOn(user, 'login').and.callFake((param, querySuccess, queryFail) => {
            const { username, password } = param;
            expect(username).toBe('pzr');
            expect(password).toBe('123456');
            return Promise.resolve(new Response(param));
        });
    });
});
