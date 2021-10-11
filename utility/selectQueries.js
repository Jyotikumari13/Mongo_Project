var validator = require('validator');
var validation = require(`${PROJECT_DIR}/utility/validation`);

module.exports = {
    selectAllQuery,
    SelectAllQry,
    SelectWithSubAllQry,
    fetchAllWithJoinQry,
    getDbResult,
    agentDetail,
    insertRecord,
    updateRecord,
    getLocationAddr,
    getAsmHirarchy,
    insertManyRecord,
    insertManyRecordCustom,
    clearTable,
    distanceP2p,
    getDistanceTravlled
};

/**
 * 
 * @param {*} fieldsArray, tableName, WhereClouse, offset, limit, orderBy 
 * @param {*} tableName 
 * @param {*} WhereClouse 
 * @param {*} offset 
 * @param {*} limit 
 * @param {*} orderBy 
 */

function selectAllQuery(param) {

    var fields = param.fields.toString();
    var WhereClouse = param.WhereClouse;
    var tableName = param.tableName;
    var offset = param.offset;
    var limit = param.limit;
    var orderBy = param.orderBy;
    var sql = `SELECT ${fields} FROM ${process.env.TABLE_SCHEMA_NAME}.${tableName}`;
    
    if (WhereClouse != undefined && WhereClouse.length > 0) {
        sql+= ' where';
        
        var couter = 0;
        WhereClouse.forEach(element => {
            if(couter > 0){
                sql+= ' and';
            }
            console.log("sql", sql);
            if(validation.issetNotEmpty(element.type)){
                switch(element.type){
                    case 'IN':
                        teamsMemString = element.fieldValue.join("','");
                        sql+=` ${element.fieldName} IN ('${teamsMemString}')`;
                    break;
                    case 'NOTIN':
                        teamsMemString = element.fieldValue.join("','");
                        sql+=` ${element.fieldName} NOT IN ('${teamsMemString}')`;
                    break;
                    case 'LIKE':
                        sql+=` ${element.fieldName} LIKE '%${element.fieldValue}%'`;
                    break;  
                    case 'GTE':
                        sql+=` ${element.fieldName} >= '${element.fieldValue}'`;
                    break;  
                    case 'LTE':
                        sql+=` ${element.fieldName} <= '${element.fieldValue}'`;
                    break;  
                    case 'BETWEEN':
                        sql+=` ${element.fieldName} BETWEEN ${element.fieldValue}`;
                    break; 
                    case 'NOTNULL':
                        sql+=` ${element.fieldName} is not null`;
                    break;   
                }
            }else{
                sql+=` ${element.fieldName}='${element.fieldValue}'`;
            }
            couter++;
        });
    }

    if(validation.issetNotEmpty(orderBy)){
        sql+=` ${orderBy}`;
    }
    if(validation.issetNotEmpty(offset)){
        sql+=` offset ${offset}`;
    }
    if(validation.issetNotEmpty(limit)){
        sql+=` limit ${limit}`;
    }
    return sql;
}

function SelectAllQry(fieldsArray, tableName, WhereClouse, offset, limit, orderBy ) {
    var fields = fieldsArray.toString();
    var sql = `SELECT ${fields} FROM ${process.env.TABLE_SCHEMA_NAME}.${tableName}`;
    if (WhereClouse != undefined && WhereClouse.length > 0) {
        sql+= ` where`;
        
        var couter = 0;
        WhereClouse.forEach(element => {
            if(couter > 0){
                sql+= ` and`;
            }

            if(element.type!=undefined && element.type!=''){
                switch(element.type){
                    case 'IN':
                        teamsMemString = element.fieldValue.join("','");
                        sql+=` ${element.fieldName} IN ('${teamsMemString}')`;
                    break;
                    case 'NOTIN':
                        teamsMemString = element.fieldValue.join("','");
                        sql+=` ${element.fieldName} NOT IN ('${teamsMemString}')`;
                    break;
                    case 'LIKE':
                        sql+=` ${element.fieldName} LIKE '%${element.fieldValue}%'`;
                    break;  
                    case 'GTE':
                        sql+=` ${element.fieldName} >= '${element.fieldValue}'`;
                    break;  
                    case 'LTE':
                        sql+=` ${element.fieldName} <= '${element.fieldValue}'`;
                    break;  
                    case 'BETWEEN':
                        sql+=` ${element.fieldName} BETWEEN ${element.fieldValue}`;
                    break; 
                    case 'NOTNULL':
                        sql+=` ${element.fieldName} is not null`;
                    break;   
                }
            }else{
                sql+=` ${element.fieldName}='${element.fieldValue}'`;
            }
            couter++;
        });
    }

    console.log('orderBy >>>>> ',orderBy  )
    if(orderBy!=undefined && orderBy!=''){
        sql+=` ${orderBy}`;
    }
    if(offset!=undefined && validator.isInt(offset,{ min: 0, max: 9999999999999 })){
        sql+=` offset ${offset}`;
    }
    if(limit!=undefined && validator.isInt(limit,{ min: 0, max: 1000 })){
        sql+=` limit ${limit}`;
    }
    return sql;
}

function SelectWithSubAllQry(fieldsArray, subQuery, WhereClouse, offset, limit, orderBy ) {
    const fields = fieldsArray.toString();
    var sql = `SELECT ${fields} FROM ${subQuery}`;
    if (WhereClouse != undefined && WhereClouse.length > 0) {
        sql+= ` where`;
        
        var couter = 0;
        WhereClouse.forEach(element => {
            if(couter > 0){
                sql+= ` and`;
            }

            if(element.type!=undefined && element.type!=''){
                switch(element.type){
                    case 'IN':
                        teamsMemString = element.fieldValue.join("','");
                        sql+=` ${element.fieldName} IN ('${teamsMemString}')`;
                    break;
                    case 'LIKE':
                        sql+=` ${element.fieldName} LIKE '%${element.fieldValue}%'`;
                    break;  
                    case 'GTE':
                        sql+=` ${element.fieldName} >= '${element.fieldValue}'`;
                    break;  
                    case 'LTE':
                        sql+=` ${element.fieldName} <= '${element.fieldValue}'`;
                    break;  
                    case 'BETWEEN':
                        sql+=` ${element.fieldName} BETWEEN ${element.fieldValue}`;
                    break;   
                    case 'NOTNULL':
                        sql+=` ${element.fieldName} is not null`;
                    break;  
                }
            }else{
                sql+=` ${element.fieldName}='${element.fieldValue}'`;
            }
            couter++;
        });
    }

    console.log('orderBy >>>>> ',orderBy  )
    if(orderBy!=undefined && orderBy!=''){
        sql+=` ${orderBy}`;
    }
    if(offset!=undefined && validator.isInt(offset,{ min: 0, max: 9999999999999 })){
        sql+=` offset ${offset}`;
    }
    if(limit!=undefined && validator.isInt(limit,{ min: 0, max: 1000 })){
        sql+=` limit ${limit}`;
    }
    return sql;
}

function fetchAllWithJoinQry(fieldsArray, tableName,joins, WhereClouse, offset, limit, orderBy ) {
    const fields = fieldsArray.toString();
    var sql = `SELECT ${fields} FROM ${process.env.TABLE_SCHEMA_NAME}.${tableName}`;
    var joinString = ``;
    if (joins != undefined && joins.length > 0) {
       
        joins.forEach(async element => {
           
            joinString += ` ${element.type} JOIN ${process.env.TABLE_SCHEMA_NAME}.${element.table_name} ON ${element.p_table_field} = ${element.s_table_field}`;
            
        });
        sql+=joinString;
    }

    if (WhereClouse != undefined && WhereClouse.length > 0) {
        sql+=` where`;
        var couter = 0;
        WhereClouse.forEach(element => {
            if(couter > 0){
                sql += ` and`;
            }
            if(element.type!=undefined && element.type!=''){
                switch(element.type){
                    case 'IN':
                        teamsMemString = element.fieldValue.join("','");
                        sql+=` ${element.fieldName} IN ('${teamsMemString}')`;
                    break;
                    case 'LIKE':
                        sql+=` ${element.fieldName} LIKE '%${element.fieldValue}%'`;
                    break;  
                    case 'GTE':
                        sql+=` ${element.fieldName} >= '${element.fieldValue}'`;
                    break;
                    case 'GT':
                        sql+=` ${element.fieldName} > '${element.fieldValue}'`;
                    break;
                    case 'LT':
                        sql+=` ${element.fieldName} < '${element.fieldValue}'`;
                    break;
                    case 'LTE':
                        sql+=` ${element.fieldName} <= '${element.fieldValue}'`;
                    break;  
                    case 'BETWEEN':
                        sql+=` ${element.fieldName} BETWEEN ${element.fieldValue}`;
                    break;  
                    case 'NOTNULL':
                        sql+=` ${element.fieldName} is not null `;
                    break;  

                }
            }else{
                sql+=` ${element.fieldName}='${element.fieldValue}'`;
            }
            couter++;
        });
    }
    
    if(orderBy!=undefined && orderBy!=''){
        sql +=` ${orderBy}`;
    }
    if(offset!=undefined && validator.isInt(offset,{ min: 0, max: 9999999999999 })){
        sql+=` offset ${offset}`;
    }
    if(limit!=undefined && validator.isInt(limit,{ min: 0, max: 1000 })){
        sql+=` limit ${limit}`;
    }
    return sql;
}

async function getDbResult(sql) {
    return await client.query(sql)
        .then(data => {
            console.log('INFO::: Fetch DB result');
            return data;
        })
        .catch(err => {
            console.log('err ====>>>  ',err);
            return [];
        });
}

async function insertRecord(fieldsToBeInsert, fieldValues, tableName, returnIds){
   

    sql = `INSERT into ${process.env.TABLE_SCHEMA_NAME}.${tableName} (${fieldsToBeInsert}) VALUES(`;
    if(fieldValues.length > 0){
        var counter = 1;
        fieldValues.forEach(element => {
            if(counter > 1){ sql += `,`; }
            sql += `$${counter}`;
            counter++
        })
    }
    sql += `) RETURNING id`;
    if(returnIds!=undefined){
        sql +=` ${returnIds}`;
    }

    // sql += `) ON CONFLICT (username__c) 
    // DO NOTHING RETURNING id`;
    // if(returnIds!=undefined){
    //     sql +=` ${returnIds}`;
    // }

    console.log('INFO ::::::  SQL::::  ', sql);
    return await client.query(sql,fieldValues)
        .then(data => { 
            console.log(` INFO::::: INSERT RESPONSE table =${tableName} >>>>> `,data)
            if(data.rowCount > 0){
                return { "success": true, "message": "", "data": data.rows };

            }else{
                return { "success": false, "message": "Error while create record. Please try again.", "data": {} };
            }
        }).catch(err => {
            console.log('Error::: Catch 162 >>>> ', err);
            return { "success": false, "message": "Error while insert", "data": {} };
        });

}

async function insertManyRecord(fieldsToBeInsert, fieldValues, tableName, returnIds){
   

    sql = `INSERT into ${process.env.TABLE_SCHEMA_NAME}.${tableName} (${fieldsToBeInsert}) VALUES`;
    if(fieldValues.length > 0){
        let counter = 1;  // for giving '(' / ')'
        let counter2 = 1;     // for giving ','
        fieldValues.forEach((fieldValue)=> {
            if(counter == 1){ 
                sql += `(`; 
            } else {
                sql += ',('
            }
            let data = Object.values(fieldValue);
            data.forEach(value => {
                if (counter2 == 1) {
                    sql += `'${value}'`;
                } else{
                    sql += `, '${value}'`;
                }
                counter2++
            })
            counter2 = 1;
            sql += `)`;
            counter++
        })
    }
    sql += ` RETURNING id`;
    if(returnIds!=undefined){
        sql +=` ${returnIds}`;
    }
    console.log('INFO ::::::  SQL::::  ', sql);
    return await client.query(sql)
        .then(data => { 
            console.log(` INFO::::: INSERT RESPONSE table =${tableName} >>>>> `,data)
            if(data.rowCount > 0){
                return { "success": true, "message": "", "data": data.rows };

            }else{
                return { "success": false, "message": "Error while create record. Please try again.", "data": {} };
            }
        }).catch(err => {
            console.log('Error::: Catch 162 >>>> ', err);
            return { "success": false, "message": "Error while insert", "data": {} };
        });

}

async function insertManyRecordCustom(fieldsToBeInsert, fieldValues, tableName, returnIds){
   

    sql = `INSERT into ${process.env.TABLE_SCHEMA_NAME}.${tableName} (${fieldsToBeInsert}) VALUES`;
    if(fieldValues.length > 0){
        let counter = 1;  // for giving '(' / ')'
        let counter2 = 1;     // for giving ','
        fieldValues.forEach((fieldValue)=> {
            if(counter == 1){ 
                sql += `(`; 
            } else {
                sql += ',('
            }
            let data = Object.values(fieldValue);
            data.forEach(value => {
                if (counter2 == 1) {
                    sql += `'${value}'`;
                } else{
                    sql += `, '${value}'`;
                }
                counter2++
            })
            counter2 = 1;
            sql += `)`;
            counter++
        })
    }
    sql += ` ON CONFLICT (username__c) 
    DO NOTHING RETURNING id`;
    if(returnIds!=undefined){
        sql +=` ${returnIds}`;
    }
    console.log('INFO ::::::  SQL::::  ', sql);
    return await client.query(sql)
        .then(data => { 
            console.log(` INFO::::: INSERT RESPONSE table =${tableName} >>>>> `,data)
            if(data.rowCount > 0){
                return { "success": true, "message": "", "data": data.rows };

            }else{
                return { "success": false, "message": "Error while create record. Please try again.", "data": {} };
            }
        }).catch(err => {
            console.log('Error::: Catch 162 >>>> ', err);
            return { "success": false, "message": "Error while insert", "data": {} };
        });

}

async function clearTable(tableName){
   

    let sql = `DELETE FROM ${process.env.TABLE_SCHEMA_NAME}.${tableName}`;

    console.log('INFO ::::::  SQL::::  ', sql);
    return await client.query(sql)
        .then(data => { 
            console.log(` INFO::::: DELETE TABLE DATA, table =${tableName}`)
            if(data.rowCount > 0){
                return { "success": true, "message": "", "data": data.rows };

            }else{
                return { "success": false, "message": "Error while deleting records. Please try again.", "data": {} };
            }
        }).catch(err => {
            console.log('Error::: Catch 162 >>>> ', err);
            return { "success": false, "message": "Error while deleting", "data": {} };
        });

}

async function updateRecord(tableName, fieldValue, WhereClouse){
    try {

        //sql = `update zoxima.${tableName} set End_Day__c='true', End_Time__c='${attendance_time}' where Team__c='${agentid}' and Attendance_Date__c='${attendance_date}'`;
        
         var sql = `update ${process.env.TABLE_SCHEMA_NAME}.${tableName} set`;


        counter = 1;
        fieldValue.forEach(element => {
            if(counter > 1)
                sql+=`,`;
            if(element.type!=undefined && element.type == 'BOOLEAN')
                sql +=` ${element.field}=${element.value}`;
            else
                sql +=` ${element.field}='${element.value}'`;
            counter++;
        });

        sql +=` where `;


        counter = 1;
        WhereClouse.forEach(element => {
            if(counter > 1)
                sql+=` and `;
            if(element.type!=undefined && element.type=='IN'){
                teamsMemString =element.value.join("','");
                sql +=` ${element.field} IN ('${teamsMemString}')`;
            }  else
                sql +=` ${element.field}='${element.value}'`;
            counter++;
        });

        console.log(`INFO::::: ${sql}`);

        return await client.query(sql)
            .then(data => {
                if(data.rowCount > 0){
                    return { "success": true, "message": "Record updated successfully.","data":data };
                }else{
                    return { "success": false, "message": "Record updated failed.","data":{} };
                }
            }).catch(err => {
                console.log('ERROR:::: err 137 >>>> ', err);
                return { "success": false, "message": "Error while update record." };
            });
    } catch (e) {
        return { "success": false, "message": "Error while update record." };
    }
  
}

async function agentDetail(agentId){
    if (validation.issetNotEmpty(agentId)) {
        fieldsArray = [
            `team__c.member_type__c as member_type`,
            `team__c.email__c as email`, `team__c.name as team_member_name`,
            `team__c.dob__c as dob`, `team__c.designation__c as designation`,
            `team__c.phone_no__c as phone_no`,
            `team__c.Business__c as business`,
            `team__c.Manager__c as manager_id`,
            `team__c.sfid as team_id`
        ];
        tableName = `team__c`;
        WhereClouse = [];
            WhereClouse.push({ "fieldName": "sfid", "fieldValue": agentId  })
        
        orderBy = '';
        var sql = SelectAllQry(fieldsArray, tableName, WhereClouse, '0', '1', orderBy );
        console.log(`INFO:::: GET AGENT DETAIL: ${sql}`);
        var result =  await getDbResult(sql);
        return result;
    }else{
        return false;
    }
}

//getAsmHirarchy('a0H1m000001Owv4EAC');
async function getAsmHirarchy(agentid) {
    var team = {};
    team['ASM'] = [];
    team['PSM'] = [];
    team['memberType'] = '';
    team['success'] = true;
    try {
        myDetails = await agentDetail(agentid);
        
        if (myDetails.rowCount > 0) {
            team['memberType'] = myDetails.rows[0].member_type;
            var sql = '';
            if (myDetails.rowCount > 0 && myDetails.rows[0].member_type == 'PSM') {
                team['PSM'].push(agentid)
            } else {
                sql = `WITH RECURSIVE subordinates AS (
                SELECT
                sfid,
                manager__c,
                name,
                member_type__c
                FROM
                cns.team__c
                WHERE
                sfid = '${agentid}'
                UNION
                SELECT
                    e.sfid,
                    e.manager__c,
                    e.name,
                    e.member_type__c
                FROM
                    cns.team__c e
                INNER JOIN subordinates s ON s.sfid = e.manager__c
            ) SELECT
                *
            FROM
                subordinates`;
                var result = await getDbResult(sql);
                if (result.rows.length > 0) {
                    for (i in result.rows) {
                        if (result.rows[i].member_type__c == 'PSM') {
                            team['PSM'].push(result.rows[i].sfid);
                        } else {
                            team['ASM'].push(result.rows[i].sfid);
                        }
                    }
                }else{
                    team['success'] = false;
                }
            }
            
            console.log('result  > ', team)
            return team;
        }
    } catch (e) {
        team['success'] = false;
        return team;
    }
}

var rp = require('request-promise');
//getLocationAddr('28.5796079','77.3386758')
async function getLocationAddr(lat, long) {
    if (lat != null && lat != '' && long != null && long != '') {
        return rp(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_API_KEY}`)
            .then(async function (data) {

                data = JSON.parse(data);

                var isResultFound = false, address = 'N/A';
                if (data != undefined && data.results.length > 0) {
                    for (i in data.results) {
                        if (isResultFound == false) {

                            for (j in data.results[i].address_components) {
                                if (data.results[i].geometry.location_type == 'GEOMETRIC_CENTER' && isResultFound == false) {
                                    isResultFound = true;
                                    address = data.results[i].formatted_address;
                                }
                            }
                        }
                    }
                }
                return address;
            })
            .catch(function (err) {
                console.log(err);
                // Crawling failed...
            });
    } else {
        return 'N/A';
    }
}

async function distanceP2p(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
        console.log(`function values ----->lat1 ${lat1}  long1 ${lon1}  lat2 ${lat2}  long2 ${lon2}`);
        console.log('infunction');
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

//Google API integration For Getting Direction , Distance ,Time for The Optimal Route  

// async function getDirection(lat, long) {
//     if (lat != null && lat != '' && long != null && long != '') {
//         return rp(`https://maps.googleapis.com/maps/api/directions/json?origin=37.7680296,-122.4375126&destination=37.7663444,-122.4412006&key=YOUR_API_KEY`)
//             .then(async function (data) {

//                 data = JSON.parse(data);

//                 var isResultFound = false, address = 'N/A';
//                 if (data != undefined && data.results.length > 0) {
//                     for (i in data.results) {
//                         if (isResultFound == false) {

//                             for (j in data.results[i].address_components) {
//                                 if (data.results[i].geometry.location_type == 'GEOMETRIC_CENTER' && isResultFound == false) {
//                                     isResultFound = true;
//                                     address = data.results[i].formatted_address;
//                                 }
//                             }
//                         }
//                     }
//                 }
//                 return address;
//             })
//             .catch(function (err) {
//                 console.log(err);
//                 // Crawling failed...
//             });
//     } else {
//         return 'N/A';
//     }
// }

async function getDistanceTravlled(lat1,lon1,lat2,lon2) {
    if (lat1 != null && lat1 != '' && lon1 != null && lon1 != '' && lat2 != null && lat2 != '' && lon2 != null && lon2 != '') {
        return rp(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&key=${process.env.GOOGLE_API_KEY}`)
            .then(async function (data) {

                data = JSON.parse(data);
                let value_in_km = data.rows[0].elements[0].distance.text;
                let value = data.rows[0].elements[0].distance.value;
                console.log('DATA ------------------>',value);
                console.log('length ------------------>',data.rows.length);
                let valueInKm = '';
                let valueInNum = '';
                if (data != undefined && data.rows.length > 0) {
                    valueInKm = value_in_km;
                    valueInNum = value;
                }
                console.log('KM ----->',valueInKm);
                console.log('NO ----->',valueInNum);
                return {value_in_km,value};
            })
            .catch(function (err) {
                console.log(err);
                // Crawling failed...
            });
    } else {
        return 'N/A';
    }
}


