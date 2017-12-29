<template>
    <div>
        <div class="inform-header">
            <span @click="$router.push({path:'/personpage'})"> <i class="iconfont">&#xe617;</i> </span>
            <p class="gethelp-title">反馈</p>
        </div>
        <group>
            <x-textarea id="feedback" :placeholder="('请输入的反馈内容')" :max='100' v-model="feedback_text"></x-textarea>
        </group>
        <group>
            <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="feedbackPone"></x-input>
        </group>

        <div class="feedback_but"  style="position:absolute;bottom:0;width:100%;padding:20px;" >
            <x-button type="primary"  @click.native="showPosition">提交</x-button>
        </div>

        <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask text="提交成功" :position="position"></toast>
        <div v-transfer-dom>
            <alert v-model="show1" :title="('错误')" @on-show="showPosition" @on-hide="onHide"> {{ ('有个地方为空！！') }}</alert>
        </div>
    </div>
</template>

<script>
    import { XTextarea,Group,XHeader,XButton,XSwitch,Alert,TransferDomDirective as TransferDom,Toast,XInput } from 'vux'
    export default {
        directives: {
            TransferDom
        },
        components:{XTextarea,Group,XHeader,XButton,XSwitch,Alert,Toast,XInput},
        data () {
            return {
                show: false,
                show1: false,
                showPositionValue: false,
                position: 'default',
                feedback_text:"",
                feedbackPone:'',
            }
        },

        methods:{
            showPosition(){
                console.log(this.feedbackPone);
                
                if(this.feedback_text && this.feedbackPone){
                    this.show=true;
                    this.position = 'position';
                    this.showPositionValue = true
                    setTimeout(() => {
                        window.history.go(-1)
                    }, 1000);
                }else{
                    this.show1=true;
                }
            },
            onHide () {
                console.log('on hide')
            },
           

        }
    }
</script>

<style>

    .feedback_but .weui-btn_primary{
        background-color: #008080;
    }
</style>