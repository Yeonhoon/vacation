<template>
  <div>
    <v-data-table
      :headers=headers
      :items=this.records
      class="elevation-0"
      loading=true,
      loading-text="휴가 신청내역이 존재하지 않습니다."
      mobile-breakpoint="0"
      :page.sync="page"
      :item-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
    >
      <!-- <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          color="black darken-2"
          @click="editRecord(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          color="red darken-2"
          @click="removeRecord(item)"
        >
          mdi-delete
        </v-icon>
      </template> -->
    </v-data-table>
    <v-pagination
      v-model="page"
      :length="pageCount"
    >
    </v-pagination>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  props:{
    records:{
        type:Array,
        default:null,
    }
  },

  data:()=>({
    page:1,
    pageCount:0,
    itemsPerPage:5,
    headers:[
      { text:'이름',align:'center',sortable:true, value:'name', width:"100px"},
      { text: '사번',align:'center', value: 'userid', width:"100px" },
      { text: '신청일자', value: 'vdate', width:"100px", align:'center'},
      { text: '휴가 종류', value: 'vtype', width:"100px", align:'center'},
      { text: '연구책임자', value: 'boss', width:"100px", align:'center' },
      { text: '승인여부', value:'vcheck', sortable:false, width:"100px" },
   ],
  }),
}
</script>