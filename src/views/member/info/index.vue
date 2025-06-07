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
            <!-- <el-form-item label="部门ID" prop="deptId">
              <el-input v-model="queryParams.deptId" placeholder="请输入部门ID" clearable @keyup.enter="handleQuery" />
            </el-form-item> -->
            <el-form-item label="账号" prop="userName">
              <el-input v-model="queryParams.userName" placeholder="请输入账号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="queryParams.nickName" placeholder="请输入昵称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <!-- <el-form-item label="用户类型" prop="userType">
              <el-input v-model="queryParams.userType" placeholder="请输入用户类型" clearable @keyup.enter="handleQuery" />
            </el-form-item> -->
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="queryParams.email" placeholder="请输入邮箱" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="手机号码" prop="phoneNumber">
              <el-input v-model="queryParams.phoneNumber" placeholder="请输入手机号码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="queryParams.sex" placeholder="请选择性别" clearable >
                <el-option v-for="dict in sys_user_sex" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="最后登录IP" prop="loginIp">
              <el-input v-model="queryParams.loginIp" placeholder="请输入最后登录IP" clearable @keyup.enter="handleQuery" />
            </el-form-item> -->
            <!-- <el-form-item label="最后登录时间" style="width: 308px">
              <el-date-picker
                v-model="dateRangeLoginDate"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
              />
            </el-form-item> -->
            <el-form-item label="生日" style="width: 308px">
              <el-date-picker
                v-model="dateRangeBirthday"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
              />
            </el-form-item>
            <!-- <el-form-item label="身高" prop="tall">
              <el-input v-model="queryParams.tall" placeholder="请输入身高" clearable @keyup.enter="handleQuery" />
            </el-form-item> -->
            <el-form-item label="学历" prop="qualification">
              <el-input v-model="queryParams.qualification" placeholder="请输入学历" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="工作" prop="carrer">
              <el-input v-model="queryParams.carrer" placeholder="请输入工作" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="籍贯" prop="placeOfOrigin">
              <el-input v-model="queryParams.placeOfOrigin" placeholder="请输入籍贯" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="爱好" prop="hobby">
              <el-input v-model="queryParams.hobby" placeholder="请输入爱好" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="开放状态" prop="openState">
              <el-select v-model="queryParams.openState" placeholder="请选择开放状态" clearable >
                <el-option v-for="dict in member_open_state" :key="dict.value" :label="dict.label" :value="dict.value"/>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['member:info:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['member:info:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['member:info:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['member:info:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="infoList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" align="center" prop="id" v-if="true" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <el-table-column label="状态" align="center" prop="state">
          <template #default="scope">
            <dict-tag :options="sys_normal_disable" :value="scope.row.state"/>
          </template>
        </el-table-column>
        <el-table-column label="头像ID" align="center" prop="avatarUrl" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.avatarUrl" :width="50" :height="50"/>
          </template>
        </el-table-column>
        <!-- <el-table-column label="小程序头像" align="center" prop="xcxAvatar" /> -->
        <!-- <el-table-column label="乐观锁" align="center" prop="version" /> -->
        <!-- <el-table-column label="部门ID" align="center" prop="deptId" /> -->
        <el-table-column label="账号" align="center" prop="userName" />
        <el-table-column label="昵称" align="center" prop="nickName" />
        <!-- <el-table-column label="用户类型" align="center" prop="userType" /> -->
        <el-table-column label="邮箱" align="center" prop="email" />
        <el-table-column label="手机号码" align="center" prop="phoneNumber" />
        <el-table-column label="性别" align="center" prop="sex">
          <template #default="scope">
            <dict-tag :options="sys_user_sex" :value="scope.row.sex"/>
          </template>
        </el-table-column>
        <el-table-column label="生日" align="center" prop="birthday" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.birthday, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身高" align="center" prop="tall" />
        <el-table-column label="学历" align="center" prop="qualification" />
        <el-table-column label="工作" align="center" prop="carrer" />
        <el-table-column label="籍贯" align="center" prop="placeOfOrigin" />
        <el-table-column label="爱好" align="center" prop="hobby" />
        <el-table-column label="简介" align="center" prop="profile" />
        <el-table-column label="开放状态" align="center" prop="openState">
          <template #default="scope">
            <dict-tag :options="member_open_state" :value="scope.row.openState"/>
          </template>
        </el-table-column>
        <el-table-column label="最后登录IP" align="center" prop="loginIp" />
        <el-table-column label="最后登录时间" align="center" prop="loginDate" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.loginDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="扩展信息" align="center" prop="exInfo" /> -->
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['member:info:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['member:info:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改会员信息对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="infoFormRef" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="部门ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入部门ID" />
        </el-form-item> -->
        <el-form-item label="账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="头像ID" prop="avatar">
          <image-upload v-model="form.avatar"/>
        </el-form-item>
        <el-form-item label="小程序头像" prop="xcxAvatar">
          <el-input v-model="form.xcxAvatar" placeholder="请输入小程序头像" />
        </el-form-item>
        <!-- <el-form-item label="用户类型" prop="userType">
          <el-input v-model="form.userType" placeholder="请输入用户类型" />
        </el-form-item> -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option
                v-for="dict in sys_user_sex"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker clearable
            v-model="form.birthday"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="身高" prop="tall">
          <el-input v-model="form.tall" placeholder="请输入身高" />
        </el-form-item>
        <el-form-item label="学历" prop="qualification">
          <el-input v-model="form.qualification" placeholder="请输入学历" />
        </el-form-item>
        <el-form-item label="工作" prop="carrer">
          <el-input v-model="form.carrer" placeholder="请输入工作" />
        </el-form-item>
        <el-form-item label="籍贯" prop="placeOfOrigin">
          <el-input v-model="form.placeOfOrigin" placeholder="请输入籍贯" />
        </el-form-item>
        <el-form-item label="爱好" prop="hobby">
          <el-input v-model="form.hobby" placeholder="请输入爱好" />
        </el-form-item>
        <el-form-item label="简介" prop="profile">
            <el-input v-model="form.profile" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="开放状态" prop="openState">
          <el-select v-model="form.openState" placeholder="请选择开放状态">
            <el-option
                v-for="dict in member_open_state"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="最后登录IP" prop="loginIp">
          <el-input v-model="form.loginIp" placeholder="请输入最后登录IP" />
        </el-form-item>
        <el-form-item label="最后登录时间" prop="loginDate">
          <el-date-picker clearable
            v-model="form.loginDate"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择最后登录时间">
          </el-date-picker>
        </el-form-item> -->
        <!-- <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="扩展信息" prop="exInfo">
            <el-input v-model="form.exInfo" type="textarea" placeholder="请输入内容" />
        </el-form-item> -->
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

<script setup name="Info" lang="ts">
import { listInfo, getInfo, delInfo, addInfo, updateInfo } from '@/api/member/info';
import { InfoVO, InfoQuery, InfoForm } from '@/api/member/info/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_user_sex, sys_normal_disable, member_open_state } = toRefs<any>(proxy?.useDict('sys_user_sex', 'sys_normal_disable', 'member_open_state'));

const infoList = ref<InfoVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const dateRangeCreateTime = ref<[DateModelType, DateModelType]>(['', '']);
const dateRangeLoginDate = ref<[DateModelType, DateModelType]>(['', '']);
const dateRangeBirthday = ref<[DateModelType, DateModelType]>(['', '']);

const queryFormRef = ref<ElFormInstance>();
const infoFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: InfoForm = {
  id: undefined,
  version: undefined,
  state: undefined,
  deptId: undefined,
  userName: undefined,
  nickName: undefined,
  // userType: undefined,
  email: undefined,
  phoneNumber: undefined,
  sex: undefined,
  avatar: undefined,
  xcxAvatar: undefined,
  loginIp: undefined,
  loginDate: undefined,
  birthday: undefined,
  tall: undefined,
  qualification: undefined,
  carrer: undefined,
  placeOfOrigin: undefined,
  hobby: undefined,
  profile: undefined,
  openState: undefined,
  remark: undefined,
  exInfo: undefined
}
const data = reactive<PageData<InfoForm, InfoQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    id: undefined,
    state: undefined,
    deptId: undefined,
    userName: undefined,
    nickName: undefined,
    // userType: undefined,
    email: undefined,
    phoneNumber: undefined,
    sex: undefined,
    loginIp: undefined,
    tall: undefined,
    qualification: undefined,
    carrer: undefined,
    placeOfOrigin: undefined,
    hobby: undefined,
    openState: undefined,
    params: {
      createTime: undefined,
      loginDate: undefined,
      birthday: undefined,
    }
  },
  rules: {
    id: [
      { required: true, message: "ID不能为空", trigger: "blur" }
    ],
    state: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
    userName: [
      { required: true, message: "账号不能为空", trigger: "blur" }
    ],
    nickName: [
      { required: true, message: "昵称不能为空", trigger: "blur" }
    ],
    // userType: [
    //   { required: true, message: "用户类型不能为空", trigger: "blur" }
    // ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询会员信息列表 */
const getList = async () => {
  loading.value = true;
  queryParams.value.params = {};
  proxy?.addDateRange(queryParams.value, dateRangeCreateTime.value, 'CreateTime');
  proxy?.addDateRange(queryParams.value, dateRangeLoginDate.value, 'LoginDate');
  proxy?.addDateRange(queryParams.value, dateRangeBirthday.value, 'Birthday');
  const res = await listInfo(queryParams.value);
  infoList.value = res.rows;
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
  infoFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  dateRangeCreateTime.value = ['', ''];
  dateRangeLoginDate.value = ['', ''];
  dateRangeBirthday.value = ['', ''];
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: InfoVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加会员信息";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: InfoVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getInfo(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改会员信息";
}

/** 提交按钮 */
const submitForm = () => {
  infoFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateInfo(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addInfo(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: InfoVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除会员信息编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delInfo(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('member/info/export', {
    ...queryParams.value
  }, `info_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
