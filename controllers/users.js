var Promise = require('bluebird');
// var signatureInfoDB = require('../model/signatureInfo.js');

// class SignatureInfoCtl {
//     async getSignatrueInfo(){
//         return signatureInfoDB.findAsync({},{},{lean:true});
//     }
// }

// module.exports = new SignatureInfoCtl;

const userDB = require('../model/user.js');
const Op = require('sequelize').Op;
class userCtl {
    async getUserIdsByPage(pageSize,pageIndex) {
        console.log("555555555555555")
        let userIds = await userDB.findAll({
            limit:pageIndex*pageSize,
            attributes: ['id'],
            order:[
                ['id',"asc"]
            ]
        })
        console.log("userIds1:",userIds);
    };
    async getUsers(reqQuery) {
        let pageIndex = reqQuery.pageIndex-1;
        let pageSize = reqQuery.pageSize;
        console.log("pageIndex11111:",pageIndex)
        console.log("pageSize1111:",pageSize)
        //console.log("444444444:",getUserIdsByPage)
        //let userIds = await getUserIdsByPage(2,2);
        //console.log("userIds2:",userIds);
        // let users = await userDB.findAll();
        // let users = await userDB.findAll({
        //     limit:2,
        //     where:{
        //         id:{
        //             [sequelize.Op.notIn]:[1,2]
        //         }
        //     },
        //     order:[
        //         ['id',"asc"]
        //     ]
        // });
        // console.log("users:",users);
        // return users;
        // let sqlArray = ["select top :pageSize * from users ",
        //     "where ID not in(",
        //     "select top (:pageSize * :pageIndex) ID from users order by ID)", 
        //     "order by ID"];
        var condtionStr = " ";
        if(reqQuery.condition && reqQuery.condition !=""){
            let condition = reqQuery.condition;
            condtionStr="where firstName like '%"+condition+"%' or lastName like '%"+condition+"%' "
        }
        let sqlArray = ["SELECT *,COUNT(1) OVER() AS total ",
        "FROM dbo.users ",
        condtionStr,
        "ORDER BY id asc ",
        "OFFSET :pageSize * :pageIndex ROW FETCH NEXT :pageSize ROWS ONLY"]    
        let sql = sqlArray.join('');
        let users = await global.sequelize.query(sql,
        {replacements:{pageSize:parseInt(pageSize),pageIndex:parseInt(pageIndex)}, type: sequelize.QueryTypes.SELECT})
        // .then(user =>{
        //     return user;
        // })
        return users;
    };    
    async createUser(data) {
        let result = await userDB.sync({ force: false }).then(() => {
            return userDB.create(data);
        })
        return result;
    };
    async deleteUserById(userId) {
        let result = await userDB.destroy({ where: { "id": userId } });
        return result;
    };
}
module.exports = new userCtl;