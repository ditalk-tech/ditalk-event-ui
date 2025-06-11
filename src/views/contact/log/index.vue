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
            <el-form-item label="状态" prop="state">
              <el-select v-model="queryParams.state" placeholder="请选择状态" clearable >
                <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人ID" prop="contactId">
              <el-input v-model="queryParams.contactId" placeholder="请输入联系人ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="经办人ID" prop="operatorId">
              <el-input v-model="queryParams.operatorId" placeholder="请输入经办人ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="通讯渠道" prop="channel">
              <el-select v-model="queryParams.channel" placeholder="请选择通讯渠道" clearable >
                <el-option v-for="dict in ditalk_contact_channel" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="主题" prop="subject">
              <el-input v-model="queryParams.subject" placeholder="请输入主题" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['contact:log:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['contact:log:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['contact:log:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['contact:log:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="logList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" align="center" prop="id" v-if="true" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="state">
          <template #default="scope">
            <dict-tag :options="sys_normal_disable" :value="scope.row.state"/>
          </template>
        </el-table-column>
        <el-table-column label="联系人ID" align="center" prop="contactId" />
        <el-table-column label="经办人ID" align="center" prop="operatorId" />
        <el-table-column label="通讯渠道" align="center" prop="channel">
          <template #default="scope">
            <dict-tag :options="ditalk_contact_channel" :value="scope.row.channel"/>
          </template>
        </el-table-column>
        <el-table-column label="主题" align="center" prop="subject" />
        <el-table-column label="描述" align="center" prop="description" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['contact:log:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['contact:log:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改联系记录对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="logFormRef" :model="form" :rules="rules" label-width="80px">
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
        <el-form-item label="联系人ID" prop="contactId">
          <el-input v-model="form.contactId" placeholder="请输入联系人ID" />
        </el-form-item>
        <el-form-item label="经办人ID" prop="operatorId">
          <el-input v-model="form.operatorId" placeholder="请输入经办人ID" />
        </el-form-item>
        <el-form-item label="通讯渠道" prop="channel">
          <el-select v-model="form.channel" placeholder="请选择通讯渠道">
            <el-option
                v-for="dict in ditalk_contact_channel"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主题" prop="subject">
          <el-input v-model="form.subject" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="描述">
          <editor v-model="form.description" :min-height="192"/>
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

<script setup name="Log" lang="ts">
import { listLog, getLog, delLog, addLog, updateLog } from '@/api/contact/log';
import { LogVO, LogQuery, LogForm } from '@/api/contact/log/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable, ditalk_contact_channel } = toRefs<any>(proxy?.useDict('sys_normal_disable', 'ditalk_contact_channel'));

const logList = ref<LogVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const dateRangeCreateTime = ref<[DateModelType, DateModelType]>(['', '']);

const queryFormRef = ref<ElFormInstance>();
const logFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: LogForm = {
  id: undefined,
  version: undefined,
  state: undefined,
  contactId: undefined,
  operatorId: undefined,
  channel: undefined,
  subject: undefined,
  description: undefined
}
const data = reactive<PageData<LogForm, LogQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    id: undefined,
    state: undefined,
    contactId: undefined,
    operatorId: undefined,
    channel: undefined,
    subject: undefined,
    params: {
      createTime: undefined,
    }
  },
  rules: {
    id: [
      { required: true, message: "ID不能为空", trigger: "blur" }
    ],
    state: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
    contactId: [
      { required: true, message: "联系人ID不能为空", trigger: "blur" }
    ],
    operatorId: [
      { required: true, message: "经办人ID不能为空", trigger: "blur" }
    ],
    channel: [
      { required: true, message: "通讯渠道不能为空", trigger: "change" }
    ],
    subject: [
      { required: true, message: "主题不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询联系记录列表 */
const getList = async () => {
  loading.value = true;
  queryParams.value.params = {};
  proxy?.addDateRange(queryParams.value, dateRangeCreateTime.value, 'CreateTime');
  const res = await listLog(queryParams.value);
  logList.value = res.rows;
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
  logFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: LogVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加联系记录";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: LogVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getLog(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改联系记录";
}

/** 提交按钮 */
const submitForm = () => {
  logFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateLog(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addLog(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: LogVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除联系记录编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delLog(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('contact/log/export', {
    ...queryParams.value
  }, `log_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
