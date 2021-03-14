/* * @Author: Ray haiyoung
* @Date: 2020-07-24 14:55:01
* @Last Modified by: Ray haiyoung
* @Last Modified time: 2020-07-29 09:30:46
*/
<template>
  <div class="m-form"
       element-loading-text="Loding..."
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(150, 150, 150, 0.1)"
       v-loading="loading">
    <el-form
      label-width="auto"
      :size="size"
      :ref="formRef"
      :rules="rules"
      :label-position="labelPosition"
      :inline="isInline ? true : false"
      :model="searchData">
      <!--      <el-form-item-->
      <!--        :label="$t('public.formView.retrievalProcessing')"-->
      <!--        v-if="isBlock"-->
      <!--        label-width="auto"-->
      <!--        :class="isBlock ? 'm-form_block' : ''"-->
      <!--        style="display: block;margin-bottom: 5px;"></el-form-item>-->
      <!--      <el-form-item-->
      <!--        label-width="0"-->
      <!--        v-if="isHandle && isBlock"-->
      <!--        :class="isBlock ? 'm-form_block' : ''"-->
      <!--        style="display: block;margin-bottom: 10px;">-->
      <!--        <el-button-->
      <!--          :loading="item.loading"-->
      <!--          :disabled="item.loading || item.disabled"-->
      <!--          v-for="item in searchHandle"-->
      <!--          :icon="item.icon"-->
      <!--          :key="item.label"-->
      <!--          :type="item.type"-->
      <!--          :size="item.size || size"-->
      <!--          @click="item.handle"-->
      <!--        >-->
      <!--          {{ item.label }}-->
      <!--        </el-button>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item-->
      <!--        :label="$t('public.formView.conditions')"-->
      <!--        v-if="isLabelShow"-->
      <!--        label-width="auto"-->
      <!--        :class="isBlock||isLeft ? 'm-form_block' : ''"-->
      <!--        style="display: block;margin-bottom: 5px;"></el-form-item>-->
      <div class="form-item-collapse"
           v-if="isHandle && isBlock">
        <collapse>
          <el-form-item
            slot="content"
            v-for="(item, index) in searchForm"
            v-if="item.show === undefined || item.show ? true : false"
            :label-width="item.labelWidth ? item.labelWidth : 'auto'"
            :label="item.label"
            :key="item.prop"
            :prop="item.prop"
            :class="{'is-inline_textarea':item.type==='Textarea'&&isInline,'is-textarea':item.type==='Textarea'}"
          >
            <!-- 输入框 -->
            <el-input
              clearable
              :readonly="item.readonly"
              v-if="item.type === 'Input' || item.type === 'Textarea'"
              :type="item.type === 'Textarea' ? 'textarea' : 'input'"
              :rows="item.type === 'Textarea'? item.rows : ''"
              v-model.trim="searchData[item.prop]"
              :size="size"
              :autofocus="item.focus ? true : false"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              :style="{ width: item.width }"
              @blur="item.blur&&item.blur(searchData[item.prop])"
              @input="item.input&&item.input(searchData[item.prop])"
            ></el-input>

            <!-- 上传文件及图片 -->
            <upload-model
              v-if="item.type === 'UploadModel'"
              :http="item.http"
              :fileList="item.fileList"
              :listType="item.listType"
              :autoUpload="item.autoUpload"
              :showFileList="item.showFileList"
              :limit="item.limit"
              @uploadData="(val) => uploadData(item.ref, val)"
              :ref="item.ref"
              :multiple="item.multiple"
            />
            <!-- 下拉选择树 -->
            <select-tree
              v-if="item.type === 'SelectTree'"
              :data="item.treeData"
              :defaultProps="item.defaultProps"
              :multiple="item.multiple"
              :nodeKey="item.nodeKey"
              :isSearchShow="item.isSearchShow"
              :checkedKeys="item.defaultCheckedKeys"
              :isResetShow="item.isResetShow"
              @getValue="selectTreeVlaue"
              v-model.trim="searchData[item.prop]"
              :checkStrictly="item.checkStrictly"
              :highlightCurrent="item.highlightCurrent"
              :width="item.width"
              :disabled='item.disabled'
              :placeholder="item.placeholder"
              :height="item.height"
            ></select-tree>

            <!-- 下拉框 -->
            <el-select
              clearable
              filterable
              :multiple="item.multiple ? true : false"
              :filter-method="item.filterMethod"
              :readonly="item.readonly"
              v-if="item.type === 'Select'"
              :disabled="item.disabled"
              :allow-create="item.allowCreate ? true : false"
              :placeholder="item.placeholder"
              v-model.trim="searchData[item.prop]"
              :style="{ width: item.width }"
              :size="size"
              @change="item.change&&item.change(searchData[item.prop])"
            >
              <el-option v-for="op in item.options"
                         :label="op[item.labelKey || 'label']"
                         :value="op[item.valueKey || 'value']"
                         :key="op[item.valueKey || 'value']">
              </el-option>
            </el-select>
            <!-- 单选 -->
            <el-radio-group
              v-if="item.type === 'Radio'"
              v-model="searchData[item.prop]">
              <el-radio
                v-for="ra in item.radios"
                :label="ra.value"
                :key="ra.value">
                {{ ra.label }}
              </el-radio>
            </el-radio-group>
            <!-- 单选按钮 -->
            <el-radio-group
              v-if="item.type === 'RadioButton'"
              v-model="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop])">
              <el-radio-button
                v-for="ra in item.radios"
                :label="ra.value"
                :key="ra.value">{{ ra.label }}
              </el-radio-button>
            </el-radio-group>
            <!-- 复选框 -->
            <el-checkbox-group
              v-if="item.type === 'Checkbox'"
              :style="{ width: item.width }"
              v-model="searchData[item.prop]">
              <el-checkbox
                v-for="ch in item.checkboxs"
                :label="ch.value"
                :key="ch.value">{{ ch.label }}
              </el-checkbox>
            </el-checkbox-group>
            <!-- 日期 -->
            <el-date-picker
              :disabled="item.disabled"
              :value-format="item.valueFormat"
              :readonly="item.readonly"
              :style="{ width: item.width }"
              v-if="item.type === 'Date'"
              :placeholder="item.placeholder"
              :picker-options="item.pickerOptions"
              v-model.trim="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop])"
            ></el-date-picker>
            <!-- 时间 -->
            <el-time-select
              v-if="item.type === 'Time'"
              :value-format="item.valueFormat"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :style="{ width: item.width }"
              :placeholder="item.placeholder"
              :picker-options="item.pickerOptions"
              v-model.trim="searchData[item.prop]"
            ></el-time-select>
            <!-- 日期时间 -->
            <el-date-picker
              v-if="item.type === 'DateTime'"
              :value-format="item.valueFormat"
              type="datetime"
              :readonly="item.readonly"
              :style="{ width: item.width }"
              :placeholder="item.placeholder"
              :picker-options="item.pickerOptions"
              v-model.trim="searchData[item.prop]"
              :disabled="item.disable && item.disable(searchData[item.prop])"
            ></el-date-picker>
            <!-- 滑块 -->
            <el-slider
              :disabled="item.disabled"
              v-if="item.type === 'Slider'"
              v-model="searchData[item.prop]">
            </el-slider>
            <!-- 开关 -->
            <el-switch
              v-if="item.type === 'Switch'"
              :disabled="item.disabled"
              :active-text="item.active"
              :inactive-text="item.inactive"
              v-model="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop])">
            </el-switch>
            <!-- 输入框搜索 -->
            <el-input
              clearable
              v-if="item.type === 'InputHandle'"
              v-model.trim="searchData[item.prop]"
              :size="size"
              :placeholder="item.placeholder"
              :style="{ width: item.width }"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :type="item.typetext"
              @blur="item.blur&&item.blur(searchData[item.prop])"
              @input="item.input&&item.input(searchData[item.prop])"
            >
              <el-button
                slot="append"
                :style="{backgroundColor:theme}"
                :type="item.buttonType"
                :icon="item.buttonIcon"
                :disabled="item.buttonDisabled"
                @click="item.buttonClick">
                {{ item.buttonText }}
              </el-button>
            </el-input>
            <!-- 级联选择器-->
            <el-cascader
              v-if="item.type === 'Cascader'"
              :style="{ width: item.width }"
              :disabled="item.disabled"
              filterable
              v-model.trim="searchData[item.prop]"
              :placeholder="item.placeholder"
              :separator="item.separator"
              :checkStrictly="item.checkStrictly"
              :options="item.options"
              :readonly="item.readonly"
              :filter-method="item.filterMethod"
              :node-key="item.nodeKey"
              :before-filter="item.beforeFilter"
              :props="item.props"
              :ref="item.ref"
              :show-all-levels="item.showAllLevels"
              @change="item.change&&item.change(searchData[item.prop])"
            ></el-cascader>
            <!-- 文本 -->
            <p
              v-if="item.type === 'Text'"
              :style="{ width: item.width }"
            >{{ searchData[item.prop] }}</p>
          </el-form-item>
        </collapse>
        <el-form-item
            label-width="0"
            v-if="isHandle && isBlock"
            class="form-item-collapse-btn-group"
            style="display: block;margin-bottom: 10px;">
            <el-button
              :loading="item.loading"
              :disabled="item.loading || item.disabled"
              v-for="item in searchHandle"
              :icon="item.icon"
              :key="item.label"
              :type="item.type"
              plain
              :size="item.size || size"
              @click="item.handle"
            >
              {{ item.label }}
            </el-button>
          </el-form-item>
      </div>
      <template v-else>
        <el-form-item
          v-for="(item, index) in searchForm"
          v-if="item.show === undefined || item.show ? true : false"
          :label-width="item.labelWidth ? item.labelWidth : 'auto'"
          :label="item.label"
          :key="item.prop"
          :prop="item.prop"
          :class="{'is-inline_textarea':item.type==='Textarea'&&isInline,'is-textarea':item.type==='Textarea'}"
        >
          <!-- 输入框 -->
          <el-input
            clearable
            :readonly="item.readonly"
            v-if="item.type === 'Input' || item.type === 'Textarea'"
            :type="item.type === 'Textarea' ? 'textarea' : 'input'"
            :rows="item.type === 'Textarea'? item.rows : ''"
            v-model.trim="searchData[item.prop]"
            :size="size"
            :autofocus="item.focus ? true : false"
            :disabled="item.disabled"
            :placeholder="item.placeholder"
            :style="{ width: item.width }"
            @blur="item.blur&&item.blur(searchData[item.prop])"
            @input="item.input&&item.input(searchData[item.prop])"
          ></el-input>

          <!-- 上传文件及图片 -->
          <upload-model
            v-if="item.type === 'UploadModel'"
            :http="item.http"
            :fileList="item.fileList"
            :listType="item.listType"
            :autoUpload="item.autoUpload"
            :showFileList="item.showFileList"
            :limit="item.limit"
            @uploadData="(val) => uploadData(item.ref, val)"
            :ref="item.ref"
            :multiple="item.multiple"
          />
          <!-- 下拉选择树 -->
          <select-tree
            v-if="item.type === 'SelectTree'"
            :data="item.treeData"
            :defaultProps="item.defaultProps"
            :multiple="item.multiple"
            :nodeKey="item.nodeKey"
            :isSearchShow="item.isSearchShow"
            :checkedKeys="item.defaultCheckedKeys"
            :isResetShow="item.isResetShow"
            @getValue="selectTreeVlaue"
            v-model.trim="searchData[item.prop]"
            :checkStrictly="item.checkStrictly"
            :highlightCurrent="item.highlightCurrent"
            :width="item.width"
            :disabled='item.disabled'
            :placeholder="item.placeholder"
            :height="item.height"
          ></select-tree>

          <!-- 下拉框 -->
          <el-select
            clearable
            filterable
            :multiple="item.multiple ? true : false"
            :filter-method="item.filterMethod"
            :readonly="item.readonly"
            v-if="item.type === 'Select'"
            :disabled="item.disabled"
            :allow-create="item.allowCreate ? true : false"
            :placeholder="item.placeholder"
            v-model.trim="searchData[item.prop]"
            :style="{ width: item.width }"
            :size="size"
            @change="item.change&&item.change(searchData[item.prop])"
          >
            <el-option v-for="op in item.options"
                       :label="op[item.labelKey || 'label']"
                       :value="op[item.valueKey || 'value']"
                       :key="op[item.valueKey || 'value']">
            </el-option>
          </el-select>
          <!-- 单选 -->
          <el-radio-group
            v-if="item.type === 'Radio'"
            v-model="searchData[item.prop]">
            <el-radio
              v-for="ra in item.radios"
              :label="ra.value"
              :key="ra.value">
              {{ ra.label }}
            </el-radio>
          </el-radio-group>
          <!-- 单选按钮 -->
          <el-radio-group
            v-if="item.type === 'RadioButton'"
            v-model="searchData[item.prop]"
            @change="item.change && item.change(searchData[item.prop])">
            <el-radio-button
              v-for="ra in item.radios"
              :label="ra.value"
              :key="ra.value">{{ ra.label }}
            </el-radio-button>
          </el-radio-group>
          <!-- 复选框 -->
          <el-checkbox-group
            v-if="item.type === 'Checkbox'"
            :style="{ width: item.width }"
            v-model="searchData[item.prop]">
            <el-checkbox
              v-for="ch in item.checkboxs"
              :label="ch.value"
              :key="ch.value">{{ ch.label }}
            </el-checkbox>
          </el-checkbox-group>
          <!-- 日期 -->
          <el-date-picker
            :disabled="item.disabled"
            :value-format="item.valueFormat"
            :readonly="item.readonly"
            :style="{ width: item.width }"
            v-if="item.type === 'Date'"
            :placeholder="item.placeholder"
            :picker-options="item.pickerOptions"
            v-model.trim="searchData[item.prop]"
            @change="item.change && item.change(searchData[item.prop])"
          ></el-date-picker>
          <!-- 时间 -->
          <el-time-select
            v-if="item.type === 'Time'"
            :value-format="item.valueFormat"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :style="{ width: item.width }"
            :placeholder="item.placeholder"
            :picker-options="item.pickerOptions"
            v-model.trim="searchData[item.prop]"
          ></el-time-select>
          <!-- 日期时间 -->
          <el-date-picker
            v-if="item.type === 'DateTime'"
            :value-format="item.valueFormat"
            type="datetime"
            :readonly="item.readonly"
            :style="{ width: item.width }"
            :placeholder="item.placeholder"
            :picker-options="item.pickerOptions"
            v-model.trim="searchData[item.prop]"
            :disabled="item.disable && item.disable(searchData[item.prop])"
          ></el-date-picker>
          <!-- 滑块 -->
          <el-slider
            :disabled="item.disabled"
            v-if="item.type === 'Slider'"
            v-model="searchData[item.prop]">
          </el-slider>
          <!-- 开关 -->
          <el-switch
            v-if="item.type === 'Switch'"
            :disabled="item.disabled"
            :active-text="item.active"
            :inactive-text="item.inactive"
            v-model="searchData[item.prop]"
            @change="item.change && item.change(searchData[item.prop])">
          </el-switch>
          <!-- 输入框搜索 -->
          <el-input
            clearable
            v-if="item.type === 'InputHandle'"
            v-model.trim="searchData[item.prop]"
            :size="size"
            :placeholder="item.placeholder"
            :style="{ width: item.width }"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :type="item.typetext"
            @blur="item.blur&&item.blur(searchData[item.prop])"
            @input="item.input&&item.input(searchData[item.prop])"
          >
            <el-button
              slot="append"
              :style="{backgroundColor:theme}"
              :type="item.buttonType"
              :icon="item.buttonIcon"
              :disabled="item.buttonDisabled"
              @click="item.buttonClick">
              {{ item.buttonText }}
            </el-button>
          </el-input>
          <!-- 级联选择器-->
          <el-cascader
            v-if="item.type === 'Cascader'"
            :style="{ width: item.width }"
            :disabled="item.disabled"
            filterable
            v-model.trim="searchData[item.prop]"
            :placeholder="item.placeholder"
            :separator="item.separator"
            :checkStrictly="item.checkStrictly"
            :options="item.options"
            :readonly="item.readonly"
            :filter-method="item.filterMethod"
            :node-key="item.nodeKey"
            :before-filter="item.beforeFilter"
            :props="item.props"
            :ref="item.ref"
            :show-all-levels="item.showAllLevels"
            @change="item.change&&item.change(searchData[item.prop])"
          ></el-cascader>
          <!-- 文本 -->
          <p
            v-if="item.type === 'Text'"
            :style="{ width: item.width }"
          >{{ searchData[item.prop] }}</p>
        </el-form-item>
      </template>

      <!-- 操作 -->
      <el-form-item
        v-if="isHandle && isLeft && !isBlock"
        :class="isLeft ? 'left' : ''"
        label-width="0">
        <el-button
          :loading="item.loading"
          :disabled="item.loading || item.disabled"
          v-for="item in searchHandle"
          :icon="item.icon"
          :key="item.label"
          :type="item.type"
          :size="item.size || size"
          @click="item.handle"
        >
          {{ item.label }}
        </el-button>
      </el-form-item>

      <!-- 操作 -->
      <el-form-item
        v-if="isHandle && !isBlock && !isLeft"
        label-width="0">
        <el-button
          :loading="item.loading"
          :disabled="item.loading || item.disabled"
          v-for="item in searchHandle"
          :key="item.label"
          :icon="item.icon"
          :type="item.type"
          :size="item.size || size"
          @click="item.handle"
        >
          {{ item.label }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import selectTree from '../select-tree/index'
import collapse from '../collapse/index'

export default {
  name: 'formView',
  computed: {
    size() {
      return this.$store.state.settings.size;
    },
    theme() {
      return this.$store.state.settings.theme;
    }
  },
  props: {
    //是否显示loading
    loading: {
      type: Boolean,
      default: false
    },
    //操作按钮是否居左下显示
    isLeft: {
      type: Boolean,
      default: false
    },
    //操作按钮是否显示在顶部
    isBlock: {
      type: Boolean,
      default: false
    },
    //检索条件标题是否显示
    isLabelShow: {
      type: Boolean,
      default: false,
    },
    //是否行内显示
    isInline: {
      type: Boolean,
      default: true
    },
    //表单域标签的位置
    labelPosition: {
      type: String,
      default: 'right',
      validator(type) {
        if (type && !['right', 'left', 'top'].includes(type)) {
          console.error('labelPosition类型必须为:' + ['right', 'left', 'top'].join('、'));
        }
        return true;
      }
    },
    //ref
    formRef: {
      type: String,
      default: 'inlineForm'
    },
    //rules
    rules: {
      type: Object,
      default: () => {
        return {};
      }
    },
    //form表单样式
    searchForm: {
      type: Array,
      default: () => []
    },
    //是否有操作行
    isHandle: {
      type: Boolean,
      default: true
    },
    //操作行信息
    searchHandle: {
      type: Array | Object,
      default: () => []
    },
    //form表单数据
    searchData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    //获取selectTree数据
    selectTreeVlaue(value) {
      this.$emit("selectTreeGetValue", value);
    },
    //获取上传数据
    uploadData(ref, val) {
      var obj ={
        obj:ref
      }
      Object.assign(val, obj);
      this.$emit("uploadData", val);
    },
  },
  components: {
    'select-tree': selectTree,
    collapse
  }
};
</script>
<style lang="scss">
.m-form {
  .el-form {
    &.el-form--inline {
      .el-form-item {
        margin-right: 30px;

        &.left {
          display: flex;
          justify-content: flex-start;
        }

        &.m-form_block {
          .el-form-item__label-wrap {
            margin-left: 0 !important;

            .el-form-item__label {
              text-align: left;
            }
          }
        }
      }
    }

    .el-form-item {
      &.is-textarea {
        &.is-inline_textarea {
          display: flex;
          margin-right: 0;
          justify-content: flex-start;

          .el-form-item__content {
            flex: 1;
          }
        }
      }

      .el-form-item__label {
        font-weight: normal;
        min-width: 100px;
      }

      .el-form-item__content {
        .el-input-group__append {
          color: #fff;
        }
      }
    }
  }
  .form-item-collapse {
    display: flex;
    .collapse-block {
      flex: 1;
    }
    .el-form-item.form-item-collapse-btn-group {
      margin-left: 5px;
      width: 165px;
      margin-right: 0;
    }
  }
}
</style>
