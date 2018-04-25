<template>
  <div class="valiForm">
    <div class="ui form">
      <div class="three fields">
        <div class="field" :class="valiResult.account?'error':''">
          <label>{{valiResult.account?valiResult.account.msg:'用户名'}}</label>
          <input type="text" placeholder="邮箱\电话\6-12位字符" v-model="form.account">
        </div>
        <div class="field" :class="valiResult.email?'error':''">
          <label>{{valiResult.email?valiResult.email.msg:'邮箱'}}</label>
          <input type="text" placeholder="邮箱" v-model="form.email">
        </div>
        <div class="field" :class="valiResult.idCard?'error':''">
          <label>{{valiResult.idCard?valiResult.idCard.msg:'身份证'}}</label>
          <input type="text" placeholder="身份证" v-model="form.idCard">
        </div>
      </div>
      <div class="three fields">
        <div class="field" :class="valiResult.phone?'error':''">
          <label>{{valiResult.phone?valiResult.phone.msg:'电话'}}</label>
          <input type="text" placeholder="电话" v-model="form.phone">
        </div>
        <div class="field" :class="valiResult.age?'error':''">
          <label>{{valiResult.age?valiResult.age.msg:'年龄'}}</label>
          <input type="text" placeholder="年龄" v-model="form.age">
        </div>
        <div class="field" :class="valiResult.number?'error':''">
          <label>{{valiResult.number?valiResult.number.msg:'数字'}}</label>
          <input type="text" placeholder="数字" v-model="form.number">
        </div>
      </div>
      <button class="ui button" type="submit" @click="validateForm">Submit</button>
    </div>
  </div>
</template>
<script>
  import ValiForm from '../../../libraries/valiform/ValiForm'
  const valiForm=new ValiForm()
  export default {
    name:'ValiForm',
    data(){
      return {
        form:{
          account:'',
          email:'',
          idCard:'',
          phone:'',
          age:'',
          number:''
        },
        valiResult:{}
      }
    },
    created(){
      this.rules={
        account:{
          rules:[
            {
              type:'inFun',
              rule:'required',
              msg:'用户名不能为空'
            },
            {
              type:'patter',
              rule:[/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,/^[1][3,4,5,7,8][0-9]{9}$/,/^[\w]{6,12}$/],
              msg:'用户名可以为邮箱\\电话\\6-12位字符',
              join:'or'
            },
          ],
          join:'and',
          unNecessary:true
        },
        email:{
          rules:[
            {
              type:'inFun',
              rule:'required',
              msg:'邮箱不能为空'
            },
            {
              type:'patter',
              rule:'email',
              msg:'邮箱不能格式不正确',
            },
          ],
          join:'and',
          unNecessary:true
        },
        idCard:{
          rules:[
            {
              type:'inFun',
              rule:'required',
              msg:'身份证不能为空'
            },
            {
              type:'patter',
              rule:'idCard',
              msg:'身份证格式不正确',
            },
          ],
          join:'and'
        },
        phone:{
          rules:[
            {
              type:'inFun',
              rule:'required',
              msg:'手机号不能为空'
            },
            {
              type:'patter',
              rule:'phone',
              msg:'手机号格式不正确',
            },
          ],
          join:'and'
        },
        age:{
          rules:[
            {
              type:'inFun',
              rule:'required',
              msg:'年龄不能为空'
            },
            {
              type:'inFun',
              rule:'between(16,99)',
              msg:'年龄在16至99之间'
            },
          ],
          join:'and',

        },
        number:{
          rules:[
            {
              type:'inFun',
              rule:'required',
              msg:'正整数不能为空'
            },
            {
              type:'patter',
              rule:/^[1-9]\d*$/,
              msg:'请填入正整数',
            },
          ],
          join:'and'
        },
      }
    },
    methods:{
      validateForm(){
        for(let key in this.rules){
          if(this.form[key]){
            this.rules[key].value=this.form[key]
          }
        }
        this.valiResult=valiForm.form(this.rules,true)
      }
    }
  }
</script>
