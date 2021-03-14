/*
* @Author: Ray haiyoung
* @Date: 2020-07-24 17:30:39
* @Last Modified by: Ray haiyoung
* @Last Modified time: 2020-07-27 10:52:46
*/
<template>
  <div class="m-popup">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      :style="{minHeight: '300px'}"
      :top="top"
      :show-close="showClose"
      :modal="modal"
      ref="elDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="destroyOnClose"
      :before-close="handleClose"
    >
      <slot name="content" />
      <span v-if="footerList.length>0" slot="footer" class="dialog-footer">
        <el-button
          v-for="(item,index) in footerList"
          :key="index"
          :size="btnSize"
          :loading="item.loading"
          :disabled="item.loading || item.disabled"
          :type="item.type"
          @click="handleClose(item.isSubmit)"
        >{{ item.name }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { isType } from '@/utils'

export default {
  name: 'Popup',
  props: {
    // 是否显示
    isShow: {
      type: Boolean,
      default: false
    },
    // 宽度
    size: {
      type: String,
      default: 'small',
      validator(type) {
        if (type && !['medium', 'small', 'mini'].includes(type)) {
          console.error(
            'size类型必须为:' + ['medium', 'small', 'mini'].join('、')
          )
        }
        return true
      }
    },
    // Dialog CSS 中的 margin-top 值
    top: {
      type: String,
      default: '15vh'
    },
    // 是否需要遮罩层
    modal: {
      type: Boolean,
      default: true
    },
    // Dialog 的标题
    title: {
      type: String,
      default: '提示'
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 关闭时销毁 Dialog 中的元素
    destroyOnClose: {
      type: Boolean,
      default: true
    },
    // 底部操作行
    footerList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    dialogVisible() {
      return this.isShow
    },
    btnSize() {
      return this.$store.state.settings.size
    },
    width() {
      let num = '410px'
      if (this.size === 'medium') {
        num = '850px';
        this.$refs.elDialog ? this.$refs.elDialog.$el.firstChild.style.height = '70%' : "";
        if(document.querySelector(".el-dialog__body")) {
          document.querySelector(".el-dialog__body").style.maxHeight = "calc(100% - 112px)";
          document.querySelector(".el-dialog__body").style.overflowY = "auto";
        }
      } else if (this.size === 'small') {
        num = '590px';
        this.$refs.elDialog ? this.$refs.elDialog.$el.firstChild.style.height = 'auto' : "";
        if(document.querySelector(".el-dialog__body")) {
          document.querySelector(".el-dialog__body").style.maxHeight = "auto";
        }
      }
      return num
    }
  },
  methods: {
    handleClose(flag) {
      if (isType.isFunction(flag)) flag = false
      if (flag) {
        // 提交or确定
        // todo...
        this.$emit('senddialogVisible', flag)
      } else {
        this.$emit('senddialogVisible', flag)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/variables.scss";
  .m-popup {
    ::v-deep .el-dialog__wrapper {
      width: 100%;
      height: 100%;
      overflow: hidden;

      .el-dialog {
        max-height: 70%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .el-dialog__header{
          .el-dialog__title{
            font-size: 16px;
            color: #333;
          }
          .el-dialog__headerbtn {
            top: 40px;
            right: 40px;
          }
          padding: 0 0 18px 0;
          margin: 36px 40px 0 40px;
          border-bottom: 1px solid #E8E8E8;
        }
        .el-dialog__body {
          flex: 1;
          overflow: auto;
          padding: 20px 40px 30px 40px;
        }
        .el-dialog__footer {
          padding: 10px 40px 40px 40px;
        }
      }
    }
  }
</style>
