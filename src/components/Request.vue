<template>
  <v-container>
   <template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
    >
      <v-date-picker
        v-model="dates"
        multiple
      ></v-date-picker>
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-combobox
            v-model="dates"
            :items="dates"
            multiple
            chips
            small-chips
            label="선택한 휴가일"
            prepend-icon="mdi-calendar"
            :search-input.sync="search"
            :hide-no-data="!search"
            :filter="filter"
            v-bind="attrs"
            v-on="on"
          >
            <template v-slot:no-data>
              <v-list-item>
                <span>{{ search }}</span>
                <v-chip
                  :color="`${colors[nonce -1]} lighten-3`"
                  label
                  small
                >
                  
                </v-chip>
              </v-list-item>
            </template>
            <template
              v-slot:selection="{attrs, item, parent, selected}"
            >
              <v-chip
                v-if="item === Object(item)"
                v-bind="attrs"
                :color="`${colors[nonce -1]} lighten-3`"
                :input-value="selected"
                label
                small
              >
                <span class="pr-2">
                  {{item}}
                </span>
                <v-icon
                  small
                  @click="parent.selectItem(item)"
                >
                  $delete
                </v-icon>
              </v-chip>

            </template>
            <template v-slot:item="{ index, item }">
                <v-text-field
                    v-if="editing === item"
                    v-model="editing.text"
                    autofocus
                    flat
                    background-color="transparent"
                    hide-details
                    solo
                    @keyup.enter="edit(index, item)"
                ></v-text-field>
                <v-chip
                    v-else
                    :color="`${item.color} lighten-3`"
                    dark
                    label
                    small
                >
                {{ item }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                <v-btn
                    icon
                    @click.stop.prevent="edit(index, item)"
                >
                    <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                </v-btn>
                </v-list-item-action>
            </template>
          </v-combobox>
        </template>
      </v-menu>
    </v-col>
  </v-row>
</template>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dates: [],
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      menu: false,
      editing: null,
      editingIndex:-1,
      nonce: 1,

    }),
    watch: {
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1],
            }

            this.items.push(v)

            this.nonce++
          }

          return v
        })
      },
    },

    methods: {
      edit (index, item) {
        if (!this.editing) {
          this.editing = item
          this.editingIndex = index
        } else {
          this.editing = null
          this.editingIndex = -1
        }
      },
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
    },
  }
</script>
