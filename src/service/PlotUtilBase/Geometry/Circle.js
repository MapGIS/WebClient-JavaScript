import { defaultValue } from "../Check";
import MathUtil from "../Util/MathUtil";
import Point from "./Point";

/**
 * 圆
 * @property center  圆心
 * @property radius  半径
 */
export default class Circle{
    /**
     * 
     * @param Point [center={x:0,y:0}] 圆心 
     * @param {Number} [radius=10]       半径
     */
    constructor(center,radius)
    {
        this.center=defaultValue(center,new Point(0,0));

        this.radius=defaultValue(radius,10);
    }

    /**
     * 计算几何要素坐标串
     * @function
     * 
     * @param {*} segCount 将圆离散化的线段个数
     * @returns 
     */
    calculate(segCount=72)
    {
        const pnts=[];

        const perRadian=360/segCount;
        for(let i=0;i<segCount;i+=1)
        {
            const radian=(i*perRadian+1)*MathUtil.DTOR;
            pnts[i]=new Point(this.radius*Math.cos(radian)+this.center.x,this.radius*Math.sin(radian)+this.center.y);
        }

        pnts.push(pnts[0]);
        pnts.push(pnts[1]);
        return [pnts];
    }
}