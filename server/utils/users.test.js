const expect = require("expect");
const {Users} = require("./users");

describe('Users',()=> {
    var users;
    beforeEach(()=> {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'maniek',
            room: 'Node'
        },
        {
            id: '2',
            name: 'toska',
            room: 'PHP'
        },
        {
            id: '3',
            name: 'tomek',
            room: 'Node'
        }];
    });
    it('should add new user',()=> {
        var users = new Users();
        var user = {
            id: '123',
            name: 'mariusz',
            room: 'The Office Fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    
    it('should return names for node course',()=> {
        var userList = users.getUserList('Node');
        expect(userList).toEqual(['maniek','tomek']);
    });
    it('should return names for PHP course',()=> {
        var userList = users.getUserList('PHP');
        expect(userList).toEqual(['toska']);
    });
    it('should remove user',()=> {
        var userId = '2';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    it('should not remove user',()=> {
        var userId = '22';
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
    it('should find user',()=> {
        var userId = '1';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });
    it('should not find user',()=> {
         var userId = '88';
        var user = users.getUser(userId);
        expect(user).toNotExist();
        
    });
});



