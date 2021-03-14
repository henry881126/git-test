<template>
  <div>
    <el-upload
      class="upload-model"
      ref="upload"
      :action="http"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :http-request="uploadFile"
      :list-type="listType"
      :aupload="autoUpload"
      :show-file-list="showFileList"
      :limit="limit"
      :multiple="multiple"
      :accept="accept"
      :headers="headers"
      :disabled="uploading"
    >
      <el-button
        slot="trigger"
        :size="size"
        type="primary"
        :loading="uploading"
        :icon="uploadIcon"
        >{{ uploadTitle }}</el-button
      >
      <el-button
        v-if="!autoUpload"
        style="margin-left: 10px"
        :size="size"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">{{ describe }}</div>
    </el-upload>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "upload-model",
  data() {
    return {
      fileData: new FormData(), // 文件上传数据（多文件合一）
      uploading: false,
    };
  },
  props: {
    //是否需要规定上传类型，默认图片类型
    accept: {
      type: String,
      default: () => ".jpg, .png, .gif, .jpeg,.xlsx,.xls",
    },
    //下载按钮是否显示隐藏
    downloadIsShow: {
      type: Boolean,
      default: () => false,
    },
    //是否自动上传
    autoUpload: {
      type: Boolean,
      default: () => false,
    },
    //上传文件类型
    listType: {
      type: String,
      default: () => " ",
    },
    //是否显示已上传文件列表
    showFileList: {
      type: Boolean,
      default: () => true,
    },
    //上传图片的个数，必传
    limit: {
      type: Number,
      default: () => 1000,
    },
    //是否需要多选
    multiple: {
      type: Boolean,
      default: () => true,
    },
    //上传文件的一个数组，必传
    fileList: {
      type: Array,
      default: () => [],
    },
    //请求头默认设置
    headers: {
      type: Object,
      default: () => {
        return {
          "Content-Type": "application/x-www-form-urlencoded",
        };
      },
    },
    //必选参数，上传的地址
    http: {
      type: String,
      default: () => " ",
    },
    //上传规则描述
    describe: {
      type: String,
      default: () => "",
    },
    //上传协议
    method: {
      type: String,
      default: () => "post",
    },
    // 上传文件按钮icon
    uploadIcon: {
      type: String,
      default: "",
    },
    // 上传按钮title
    uploadTitle: {
      type: String,
      default: "选取文件",
    },
    // 接口接收的key
    fileKey: {
      type: String,
      default: "files",
    },
  },
  computed: {
    size() {
      return this.$store.state.settings.size;
    },
  },
  methods: {
    // 上传文件
    uploadFile(file) {
      this.fileData.append(this.fileKey, file.file); // append增加数据
      if (this.autoUpload) {
        this.uploading = true;
        this.submitUpload();
      }
    },
    // 上传到服务器
    submitUpload() {
      if (!this.autoUpload) {
        this.fileData = new FormData();
        this.$refs.upload.submit();
      }
      // 提交调用uploadFile函数
      axios({
        url: this.http,
        method: this.method,
        data: this.fileData,
        baseURL: process.env.VUE_APP_BASE_API,
        timeout: 50000,
        headers: this.headers,
      }).then((response) => {
        console.log("response", response.data.data.Header);
        if (response.data.statusCode === 200) {
          if (response.data.data.Header.RetCode === "000000") {
            this.$emit("uploadData", response.data.data);
            this.uploading = false;
            this.$message({
              message: "上传成功",
              type: "success",
            });
          } else {
            this.$errorPrompt(response.data.data.Header.RetMsg);
          }
        } else {
          this.$errorPrompt("文件上传失败");
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>
