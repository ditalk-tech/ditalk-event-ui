<template>
  <div>
    <div style="padding-left: 200px; font-size: x-large; color: #293444;">用户首页横幅设置</div>
    <div style="padding: 20px 100px;">
      <div>规则说明：</div>
      <div>1. 建议图片比例为 16:9 或 750x420。</div>
    </div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="200px">
      <el-form-item label="横幅图片" prop="ossId">
        <image-upload-one v-model="form.ossId" />
        <el-tooltip content="建议图片比例为 16:9" placement="top" effect="light">
          <el-icon>
            <QuestionFilled />
          </el-icon>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { getInfo, editInfo } from '@/api/config/banner';
import { BannerForm } from '@/api/config/banner/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const formRef = ref<ElFormInstance>() // 表单的引用
const buttonLoading = ref(false)

/** 表单变量 */
const form = ref({
  version: undefined,
  ossId: undefined,
})

/** 配置项对象 */
const BannerForm = ref<BannerForm>({
  version: undefined,
  ossId: undefined,
})

const rules = {
  version: [
    { required: true, message: "版本号不能为空", trigger: "blur" }
  ],
  ossId: [
    { required: true, message: "图片不能为空", trigger: "blur" }
  ]
}

/** 提交按钮 */
const submitForm = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      await editInfo(form.value).finally(() => buttonLoading.value = false);
      proxy?.$modal.msgSuccess("更新成功");
      await initConfig()
    }
  });
}

/** 取消按钮 */
const cancel = () => {
  reset()
}

/** 还原修改的数据 */
const reset = () => {
  initConfig()
}

/** 读取数据 */
const initConfig = async () => {
  const res = await getInfo("BannerImageCode")
  // 如果原来有数据则赋值给表单
  if (res.data && res.data.value) {
    const bannerObj = JSON.parse(res.data.value)
    form.value.ossId = bannerObj.ossId
    form.value.version = res.data.version
  }
}

onMounted(() => {
  initConfig()
});
</script>

<style lang="sass" scoped></style>