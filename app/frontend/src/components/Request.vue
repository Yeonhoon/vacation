<template>
  <v-row justify="center" class="mt-10">
  <v-card class="elevation-1 mt-10" width="400">
    <v-toolbar color="primary" class="white--text">
      <v-toolbar-title>
        <strong>휴가 신청</strong>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-combobox
              v-model="dateArr"
              multiple
              chips
              small-chips
              label="날짜 선택"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              hint="연차: 1번 클릭, 반차: 2번 클릭"
            >
              <template #selection="{attrs, item, select, selected}">
                <v-chip 
                    small-chips
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="removeDate(item)"
                    :color ="setColor(item) "
                >
                    {{ item }}
                </v-chip>
              </template>
            </v-combobox>
            </template>
            <v-date-picker
              v-model="date"
              :allowed-dates="allowedDates"
              @click:date="oneClick"
              @dblclick:date="dblClick"
              header-color="primary"
            >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="cancel"
            >
              취소
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dialog.save(date)"
            >
              확인
            </v-btn>
          </v-date-picker>
        </v-dialog>
        <v-list>
          <v-list-item
            v-for="(val,key) in Object.entries(dateDict)"
            :key="key"
          >
            <v-list-item-content>
              <v-list-item-title>{{val[0]}}:<strong>{{ val[1]}}</strong></v-list-item-title>
                  
            </v-list-item-content>
            <v-radio-group
              v-if="val[1]==='반차'"
              v-model="halfVacTime"
              row
            >
              <v-radio
                label="오전"
                value="am"
            >
              </v-radio>
              <v-radio
                label="오후"
                value="pm"
              >
              </v-radio>
            </v-radio-group>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-textarea
          class="mt-5"
          v-model="reason"
          outlined
          label="휴가사유"
          max-length="100"
          counter
          single-line
          hint="e.g. 연차, 반차..."
        >
        </v-textarea>
        </v-form>
    </v-card-text>
    <v-card-actions>
        <v-btn 
          rounded
          color="primary"
          width="100%"
          @click="submit"
        >
          <!-- class="ml-10" -->
          휴가 신청
        </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar
        v-model="snackbar"
        multi-line
        :color="snackbarColor"
        :timeout="timeout"
      >
        <!-- :color="snackbarColor" -->
        <!-- outlined -->
        <v-alert
          prominent
          class="text-center"
          :type="snackbarColor"
        >
          {{snackbarMsg}}
        </v-alert>
      </v-snackbar>
  </v-row>

</template>
<script>
import { mapMutations, mapActions} from 'vuex'
export default {
  data: () =>({
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    clickCount:0,
    dateDict: {},
    dateArr: [],
    modal: false,
    reason: '연차',
    halfItems:['오전','오후'],
    halfVacTime: 'am',
    snackbar:false,
    snackbarMsg: null,
    snackbarColor:null,
    timeout:1500,
    }),
  methods: {
    oneClick(date){
      var allDates = document.querySelectorAll(".v-date-picker-table .v-btn .v-btn__content");
      var indexOfDate = parseInt(date.split('-')[2])
      var newDateForm = new Date(date).toLocaleDateString('ko-KR',{month:'long',day:'numeric'}) +" "+ new Date(date).toLocaleDateString('ko-KR',{weekday:'short'})
  //   var status = allDates[indexOfDate-1].parentNode.style['background-color']s
      let pos = this.dateArr.indexOf(newDateForm)
  //   this.dateDict[date] = new Array()
      if (pos === -1) {
        this.dateArr.push(newDateForm)
        this.dateDict[newDateForm] = '연차'
        allDates[indexOfDate-1].parentNode.style="background-color: #c8cafa !important"
      } 
      else if (this.dateDict[newDateForm]==='연차') {
        delete this.dateDict[newDateForm]
        this.dateDict[newDateForm] = '반차'
        allDates[indexOfDate-1].parentNode.style="background-color: #faceca !important" 
      }
      else if (this.dateDict[newDateForm]==='반차') {
        let idx = this.dateArr.indexOf(newDateForm)
        this.dateArr.splice(idx,1)
        delete this.dateDict[newDateForm] 
        allDates[indexOfDate-1].parentNode.style="background-color: #ffffff"
      }
//   console.log(this.dateDict)

    },
    dblClick (date) {
        console.log(date)
    //   var allDates = document.querySelectorAll(".v-date-picker-table .v-btn .v-btn__content");
    //   var indexOfDate = parseInt(date.split('-')[2])
        
    //   var status = allDates[indexOfDate-1].parentNode.style['background-color']
    //   console.log(status)
    //   status.length !== 0 || status === "red"  
    //   ? allDates[indexOfDate-1].parentNode.style="background-color: red !important"
    //   : allDates[indexOfDate-1].parentNode.style="background-color: green !important"
    },
    removeDate(v){
        let idx = this.dateArr.indexOf(v)
        this.dateArr.splice(idx, 1)
        delete this.dateDict[v]
        var allDates = document.querySelectorAll(".v-date-picker-table .v-btn .v-btn__content");
        allDates.forEach(x=>{
        x.parentNode.style="background-color: null"
        })
        this.$forceUpdate()
    },

  setColor(date){
    if (this.dateDict[date]==='연차') return "#c8cafa"
    else if (this.dateDict[date]==='반차') return'#faceca'
    else return "#fffff"
  },

  cancel(){
    this.dateArr=[],
    this.dateDict={}
    var allDates = document.querySelectorAll(".v-date-picker-table .v-btn .v-btn__content");
    allDates.forEach(x=>{
      x.parentNode.style="background-color: #ffffff"
    })
    this.modal=false
  },

  ...mapMutations(['addVactions']),
  ...mapActions(['submitVacation']),
  submit(){
    if (Object.keys(this.dateDict).length === 0){
      this.snackbar = true
      this.snackbarColor = "error"
      this.snackbarMsg = "날짜를 선택해주세요."
    } else {
        let submitForm=[]
         for (var i=0; i<Object.keys(this.dateDict).length;i++){
            if (Object.values(this.dateDict)[i]==='반차'){
              submitForm.push ({
                'vdate':Object.keys(this.dateDict)[i],
                'vtype':Object.values(this.dateDict)[i],
                'vhour':this.halfVacTime
              })
              console.log(this.halfVacTime)
             } else {
                submitForm.push ({
                  'vdate':Object.keys(this.dateDict)[i],
                  'vtype':Object.values(this.dateDict)[i],
                  'vhour':''
              })  
             }
         }
         this.submitVacation(submitForm)
        // console.log(submitForm)
        this.snackbar = true
        this.snackbarColor = "success"
        this.snackbarMsg = "휴가 신청이 완료되었습니다."
        this.dateArr=[]
        this.dateDict={}
        this.modal=false
        var allDates = document.querySelectorAll(".v-date-picker-table .v-btn .v-btn__content");
        allDates.forEach(x=>{
            x.parentNode.style="background-color: #ffffff"
        })
    }
  },
  allowedDates: val => new Date(val).toLocaleDateString('ko-KR',{weekday:'short'}) !== '토' &&
        new Date(val).toLocaleDateString('ko-KR',{weekday:'short'}) !== '일'
  },
}
</script>
