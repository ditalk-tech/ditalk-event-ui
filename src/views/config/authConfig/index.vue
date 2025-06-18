<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="ID" prop="id">
              <el-input v-model="queryParams.id" placeholder="请输入ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="创建时间" style="width: 308px">
              <el-date-picker
                v-model="dateRangeCreateTime"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
              />
            </el-form-item>
            <el-form-item label="平台名称" prop="platform">
              <el-input v-model="queryParams.platform" placeholder="请输入平台名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="AppId" prop="appId">
              <el-input v-model="queryParams.appId" placeholder="请输入AppId" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-select v-model="queryParams.state" placeholder="请选择状态" clearable >
                <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['config:authConfig:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['config:authConfig:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['config:authConfig:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['config:authConfig:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="authConfigList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" align="center" prop="id" v-if="true" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <el-table-column label="平台名称" align="center" prop="platform" />
        <el-table-column label="AppId" align="center" prop="appId" />
        <el-table-column label="App密钥" align="center" prop="secret" />
        <el-table-column label="状态" align="center" prop="state">
          <template #default="scope">
            <dict-tag :options="sys_normal_disable" :value="scope.row.state"/>
          </template>
        </el-table-column>
        <el-table-column label="备注信息" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['config:authConfig:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['config:authConfig:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改小程序变量对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="960px" append-to-body>
      <el-form ref="authConfigFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="平台名称" prop="platform">
          <el-input v-model="form.platform" placeholder="请输入平台名称" />
        </el-form-item>
        <el-form-item label="AppId" prop="appId">
          <el-input v-model="form.appId" placeholder="请输入AppId" />
        </el-form-item>
        <el-form-item label="App密钥" prop="secret">
          <el-input v-model="form.secret" placeholder="请输入App密钥" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="form.state" placeholder="请选择状态">
            <el-option
                v-for="dict in sys_normal_disable"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="AuthConfig" lang="ts">
import { listAuthConfig, getAuthConfig, delAuthConfig, addAuthConfig, updateAuthConfig } from '@/api/config/authConfig';
import { AuthConfigVO, AuthConfigQuery, AuthConfigForm } from '@/api/config/authConfig/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable } = toRefs<any>(proxy?.useDict('sys_normal_disable'));

const authConfigList = ref<AuthConfigVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const dateRangeCreateTime = ref<[DateModelType, DateModelType]>(['', '']);

const queryFormRef = ref<ElFormInstance>();
const authConfigFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: AuthConfigForm = {
  id: undefined,
  version: undefined,
  platform: undefined,
  appId: undefined,
  secret: undefined,
  state: undefined,
  remark: undefined
}
const data = reactive<PageData<AuthConfigForm, AuthConfigQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    id: undefined,
    platform: undefined,
    appId: undefined,
    state: undefined,
    params: {
      createTime: undefined,
    }
  },
  rules: {
    id: [
      { required: true, message: "ID不能为空", trigger: "blur" }
    ],
    platform: [
      { required: true, message: "平台名称不能为空", trigger: "blur" }
    ],
    appId: [
      { required: true, message: "AppId不能为空", trigger: "blur" }
    ],
    secret: [
      { required: true, message: "App密钥不能为空", trigger: "blur" }
    ],
    state: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询小程序变量列表 */
const getList = async () => {
  loading.value = true;
  queryParams.value.params = {};
  proxy?.addDateRange(queryParams.value, dateRangeCreateTime.value, 'CreateTime');
  const res = await listAuthConfig(queryParams.value);
  authConfigList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  authConfigFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  dateRangeCreateTime.value = ['', ''];
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: AuthConfigVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加小程序变量";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: AuthConfigVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getAuthConfig(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改小程序变量";
}

/** 提交按钮 */
const submitForm = () => {
  authConfigFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateAuthConfig(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addAuthConfig(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: AuthConfigVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除小程序变量编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delAuthConfig(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('config/authConfig/export', {
    ...queryParams.value
  }, `authConfig_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
