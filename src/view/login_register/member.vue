<template>
      <div class="member-container" id="member">

        <div class="member-bg"></div>

        <div class="member-content">

          <div class="header">

            <!-- <div class="deleteIcon"><i class="iconfont">&#xe684;</i></div>

            <div class="login"><span>登录</span></div> -->

          </div>

          <div class="logo"><img src="../../../static/images/爱旅APPlogo.png" alt=""></div>

          <div class="welcome"><span>欢迎来到爱旅</span></div>

          <div class="btn-frame">

            <div class="btn-login" @click="$router.push({path:'/login'})"><span>登 录</span></div>

            <div class="btn-register"><span @click="$router.push({path:'/regname'})">创建账号</span></div>

          </div>
          
        </div>

        <div class="attention">
          <p>轻点“继续”，“创建账号”即代表我同意爱彼迎的服务条款，支付服务条款，隐私政策和非歧视政策。
            如果我是中国居民,我将与爱彼迎中国签约,我的信息将按照中国的相关法律法规储存处理,包括隐私及信息
            披露条款。</p>
        </div>

      </div>
</template>

<style>
  @import url('../../../static/css/login_register/member.css');
</style>

<script>
    export default{
        data () {
            return {msg: '这个是Home模板页'}
        }
    }
</script>
