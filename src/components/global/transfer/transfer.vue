<template>
  <div class="m-transfer">
    <el-transfer
      v-model="value"
      style="text-align: left; display: block;width:100%;"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      :filter-method="filterMethod"
      :target-order="targetOrder"
      :titles="titles"
      :render-content="renderContent"
      :button-texts="buttonTexts"
      :format="format"
      :props="transferProps && transferProps"
      :left-default-checked="leftDefaultChecked"
      :right-default-checked="rightDefaultChecked"
      :data="data">
<!--      <slot name="content"></slot>-->
<!--      <option-content slot-scope="{ option }" :option="{option}">-->
<!--      </option-content>-->

      <template v-slot:left-footer>
        <slot name="left-footer"></slot>
      </template>
      <template v-slot:right-footer>
        <slot name="right-footer"></slot>
      </template>
    </el-transfer>
  </div>
</template>

<style>

</style>

<script>
  import ElTransfer from 'element-ui/packages/transfer/src/main'
  import { isType, isInclude } from '@/utils'

  export default {
    components: {
      ElTransfer,
      OptionContent: {
        props: {
          option: Object
        },
        render(h) {
          console.log(this.props.option)

          return `<span > ${ this.option[panel.labelProp] || this.option[panel.keyProp] } < /span>`;
        }
      }
    },
    name: 'transfer',
    data() {
      return {
        value: []
      }
    },
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      filterable: {
        type: Boolean,
        default: false
      },
      filterPlaceholder: {
        type: String,
        default: '请输入搜索内容'
      },
      filterMethod: Function,
      targetOrder: {
        type: String,
        default: 'original',
        validator(type) {
          if (type && !['original', 'push', 'unshift'].includes(type)) {
            console.error(
              '排序策略类型必须为:' + ['original', 'push', 'unshift'].join('、')
            )
          }
          return true
        }
      },
      titles: {
        type: Array,
        default: () => {
          return ['列表 1', '列表 2']
        }
      },
      buttonTexts: {
        type: Array,
        default: () => {
          return []
        }
      },
      renderContent: Function,
      format: {
        type: Object,
        default: () => {
          return { noChecked: '${checked}/${total}', hasChecked: '${checked}/${total}' }
        },
        validator(props) {
          if (!(props && isInclude(props, 'noChecked') && isInclude(props, 'hasChecked'))) {
            console.error(
              '对象必须包含:' + ['noChecked', 'hasChecked'].join('、')
            )
          }
          return true
        }
      },
      transferProps: {
        type: Object,
        default: () => {
          return {
            key: 'key',
            label: 'label'
          }
        }
      },
      leftDefaultChecked: Array,
      rightDefaultChecked: Array
    },
    methods: {
      // handleChange(value, direction, movedKeys) {
      //   this.$emit('change', {
      //     value, direction, movedKeys
      //   })
      // }
    },
    mounted() {
      console.log(this.data)
    },
    self: this,
    watch: {
      data(to) {
        console.log(to)
      },
      value: function(val) {
        console.log(val)
        console.log(this)
        this.$emit('getValue', val)
      }
    }
  }
</script>
<style type="scss" scoped>
  .m-transfer {
    width: 100%;
  }
  ::v-deep .transfer-footer {
      margin-left: 20px;
      padding: 6px 5px;
    }
  ::v-deep .el-transfer-panel {
    width: 400px;
  }
</style>
