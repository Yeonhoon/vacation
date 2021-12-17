
import { required, digits, email, max, regex, integer, alpha_num } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('alpha_num',{
  ...alpha_num,
  message:'{_field_}는 영문과 숫자 조합이어야 합니다.'
})

extend('required', {
  ...required,
  message: '{_field_}는 필수입력 항목입니다.',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
  ...email,
  message: '올바른 이메일 형식이 아닙니다!',
})

extend('integer',{
  ...integer,
  message: "숫자만 입력해주세요!"
})


extend('password', {
  params:['target'],
  validate(value, {target}){
    return value === target;
  },
  message: '비밀번호가 다릅니다!'
  
})

export default {
  components:{
    ValidationObserver, ValidationProvider,
  },

}