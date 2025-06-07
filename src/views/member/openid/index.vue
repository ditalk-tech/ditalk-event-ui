<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="主键" prop="id">
              <el-input v-model="queryParams.id" placeholder="请输入主键" clearable @keyup.enter="handleQuery" />
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
            <el-form-item label="会员ID" prop="memberId">
              <el-input v-model="queryParams.memberId" placeholder="请输入会员ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="AppID" prop="appId">
              <el-input v-model="queryParams.appId" placeholder="请输入App应用ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="平台代码" prop="platform">
              <el-input v-model="queryParams.platform" placeholder="请输入平台代码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="OpenID" prop="openId">
              <el-input v-model="queryParams.openId" placeholder="请输入OpenID" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['member:openid:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['member:openid:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['member:openid:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['member:openid:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="openidList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键" align="center" prop="id" v-if="true" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <!-- <el-table-column label="乐观锁" align="center" prop="version" /> -->
        <el-table-column label="会员ID" align="center" prop="memberId" />
        <el-table-column label="App应用ID" align="center" prop="appId" />
        <el-table-column label="平台代码" align="center" prop="platform" />
        <el-table-column label="OpenID" align="center" prop="openId" />
        <el-table-column label="状态" align="center" prop="state">
          <template #default="scope">
            <dict-tag :options="sys_normal_disable" :value="scope.row.state"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['member:openid:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['member:openid:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改会员OpenId对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="openidFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员ID" prop="memberId">
          <el-input v-model="form.memberId" placeholder="请输入会员ID" />
        </el-form-item>
        <el-form-item label="App应用ID" prop="appId">
          <el-input v-model="form.appId" placeholder="请输入App应用ID" />
        </el-form-item>
        <el-form-item label="平台代码" prop="platform">
          <el-input v-model="form.platform" placeholder="请输入平台代码" />
        </el-form-item>
        <el-form-item label="OpenID" prop="openId">
          <el-input v-model="form.openId" placeholder="请输入OpenID" />
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

<script setup name="Openid" lang="ts">
import { listOpenid, getOpenid, delOpenid, addOpenid, updateOpenid } from '@/api/member/openid';
import { OpenidVO, OpenidQuery, OpenidForm } from '@/api/member/openid/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable } = toRefs<any>(proxy?.useDict('sys_normal_disable'));

const openidList = ref<OpenidVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const dateRangeCreateTime = ref<[DateModelType, DateModelType]>(['', '']);

const queryFormRef = ref<ElFormInstance>();
const openidFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: OpenidForm = {
  id: undefined,
  version: undefined,
  state: undefined,
  memberId: undefined,
  appId: undefined,
  platform: undefined,
  openId: undefined
}
const data = reactive<PageData<OpenidForm, OpenidQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    id: undefined,
    state: undefined,
    memberId: undefined,
    appId: undefined,
    platform: undefined,
    openId: undefined,
    params: {
      createTime: undefined,
    }
  },
  rules: {
    id: [
      { required: true, message: "主键不能为空", trigger: "blur" }
    ],
    state: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
    memberId: [
      { required: true, message: "会员ID不能为空", trigger: "blur" }
    ],
    appId: [
      { required: true, message: "App应用ID不能为空", trigger: "blur" }
    ],
    platform: [
      { required: true, message: "平台代码不能为空", trigger: "blur" }
    ],
    openId: [
      { required: true, message: "OpenID不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询会员OpenId列表 */
const getList = async () => {
  loading.value = true;
  queryParams.value.params = {};
  proxy?.addDateRange(queryParams.value, dateRangeCreateTime.value, 'CreateTime');
  const res = await listOpenid(queryParams.value);
  openidList.value = res.rows;
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
  openidFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: OpenidVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加会员OpenId";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: OpenidVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getOpenid(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改会员OpenId";
}

/** 提交按钮 */
const submitForm = () => {
  openidFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateOpenid(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addOpenid(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: OpenidVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除会员OpenId编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delOpenid(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('member/openid/export', {
    ...queryParams.value
  }, `openid_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
