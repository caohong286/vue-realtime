<template>
	<div>
        <p>
            <input type="radio" name="charts" id="barchart" @click="toggleChart()" value="barchart" checked="checked">
            <label for="barchart">Bar Chart</label>
            <input type="radio" name="charts" id="piechart" @click="toggleChart()" value="piechart">
            <label for="piechart">Pie Chart</label>
        </p>
        <div id="main" style="width: 100%;height: 25rem"></div>
	</div>
</template>
<script>
  	import echarts from 'echarts';
    export default {
        // name: 'votechart',
        props: ['votes'],
        data () {
            return {
                ei: '',
                chartType:'barchart',
                optionData:[
                  {value:0, name:'直接访问'},
                  {value:0, name:'邮件营销'},
                  {value:0, name:'联盟广告'},
                  {value:0, name:'视频广告'},
                  {value:0, name:'搜索引擎'}
                ]
       //          ,
       //          optionBarData:[
			    //     {
			    //         name:'直接访问',
			    //         type:'bar',
			    //         data:[0]
			    //     },
			    //     {
			    //         name:'邮件营销',
			    //         type:'bar',
			    //         data:[0]
			    //     },
			    //     {
			    //         name:'联盟广告',
			    //         type:'bar',
			    //         data:[0]
			    //     },
			    //     {
			    //         name:'视频广告',
			    //         type:'bar',
			    //         data:[0]
			    //     },
			    //     {
			    //         name:'搜索引擎',
			    //         type:'bar',
			    //         data:[0]
			    //     }
			    // ]
			    
            }
        },
        methods:{
        	addVote(){
        		console.log("vote :"+JSON.stringify(this.$props.votes));

        		const vote = this.$props.votes.vote;
				this.optionData.map(x=>{
		            if(x.name == vote.name){
		                x.value += vote.points;
		                return x;
		            }else{
		                return x;
		            }
		        });
				console.log("this.optionData :"+JSON.stringify(this.optionData));
        	},
        	getSeries(){
        		if(this.chartType == 'barchart'){
			       var barSerial = this.optionData.map(x=>{
			       		x.data = x.data?x.data:[0];
			       		x.type = 'bar';
		                x.data[0] = x.value;
		                return x;
			        });
			       return barSerial;
			    }else{
			       	return this.optionData;
			    }
        	},
        	getEchartsInstance(id){
        		if(this.ei == ''){
            		this.ei = echarts.init(document.getElementById(id));
            	}else{
            		this.ei.clear();
            	}
        	},
        	toggleChart(){
        		const chartType = document.querySelector('input[name=charts]:checked').value;
    			this.chartType = chartType;
    			if(this.chartType == 'barchart'){
			       this.drawBar('main');
			   }else{
			       	this.drawPie('main');
			   }
        	},
            drawPie(id){
            	this.getEchartsInstance(id);
                this.ei.setOption({
                 tooltip: {
                   trigger: 'item',
                   formatter: '{a}<br/>{b}:{c} ({d}%)'
                 },
                 legend: {
                   orient: 'vertical',
                   x: 'left',
                   data:this.legendData
                 },
                 series: [
                   {
                     name:'访问来源',
                     type:'pie',
                     radius:['50%','70%'],
                     center:['55%','45%'],
                     avoidLabelOverlap: false,
                     label: {
                       normal: {
                         show: true
                         // ,position: 'center'
                       },
                       emphasis: {
                         show: true,
                         textStyle: {
                           fontSize: '30',
                           fontWeight: 'blod'
                         }
                       }
                     },
                     labelLine: {
                       normal: {
                         show: false
                       }
                     },
                     data: this.getSeries()
                   }
                 ]
               })
            },
            drawBar(id){
            	this.getEchartsInstance(id);
                this.ei.setOption({
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				        data:this.legendData,
				        top:"bottom"
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '16%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category'
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    title:{
				        text:"Total Votes "+this.totalVotes() ,
				        show:true,
				        left:"center"
				    },
				    series : this.getSeries()
				})
            },
        	totalVotes:function(){
        		var total =  this.optionData.reduce(
        			function(acc, item){
                    	return acc + item.value;
                },0);
                console.log(total);
                return total;
        	}
        },

        computed:{
        	legendData:function(){
        		var nameArr =[];
        		this.optionData.forEach(function(item,idx){
        			nameArr.push(item.name);
        		});
        		return nameArr;
        	}
        },
        mounted(){
            this.$nextTick(
            	function() {
	            	if(this.chartType == 'barchart'){
	                	this.drawBar('main');
	                }else{
	                	this.drawPie('main');
	                }
	            }
            )
        },
        watch: {
        	votes: function (newVote, oldVote) {
        		this.addVote();
        		if(this.chartType == 'barchart'){
			       this.drawBar('main');
			   }else{
			       	this.drawPie('main');
			   }
		    }
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    input[type=radio] {
		width:20%;
	}
</style>