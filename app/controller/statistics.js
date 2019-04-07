/**
 *
 * 处理统计管理相关功能
 * auth: liyangli
 * date: 2019/4/6 上午12:25 .
 */
"use strict";
const Controller = require('egg').Controller;

class StatisticsController extends Controller {
    async findUserTotalDataMutation(){
        const {ctx}  = this;
        const { logger,service } = ctx;
        const respContent = {
            error_code: 0,
            msg: "",
            data: {}
        };
        
        //直接获取对应本月相关数据库
        const obj = await service.statisticsMng.findUserTotalDataMutation();
        respContent.data = obj;
        ctx.body = respContent;
        
    }
    
    async findBetUser(){
        const {ctx}  = this;
        const { logger,service } = ctx;
        const respContent = {
            error_code: 0,
            msg: "",
            data: {}
        };
        const param = ctx.request.body;
        const date = param.date;
        const curPage = param.curPage;
        const pageSize = param.pageSize;
        const obj = await service.statisticsMng.findStatistics(date,"T_Bets_User_Statistics",(curPage-1)*pageSize,pageSize);
        //获取中奖金额
        let amtCnt = await service.statisticsMng.totalBetsUserAmt(date);

        respContent.data = {
            amtCnt: amtCnt.amt,
            orderaftprizeamtCnt: amtCnt.orderaftprizeamt,
            total: obj.total,
            list: obj.list
        };
        ctx.body = respContent;
    }


    async findLotno(){
        const {ctx}  = this;
        const { logger,service } = ctx;
        const respContent = {
            error_code: 0,
            msg: "",
            data: {}
        };
        const param = ctx.request.body;
        const date = param.date;
        const curPage = param.curPage;
        const pageSize = param.pageSize;
        
        const obj = await service.statisticsMng.findStatistics(date,"T_Lotno_Statistics",(curPage-1)*pageSize,pageSize);
        
        //进行统计对应总共数据；
        const amtCnt = await service.statisticsMng.findLotnoAmt(date);
        respContent.data = {
            amtCnt: amtCnt,
            total: obj.total,
            list: obj.list
        };
        ctx.body = respContent;
        
    }
}


module.exports = StatisticsController;