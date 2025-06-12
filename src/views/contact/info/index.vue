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
            <el-form-item label="名字" prop="name">
              <el-input v-model="queryParams.name" placeholder="请输入名字" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="queryParams.nickname" placeholder="请输入昵称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="姓名拼音" prop="pinyin">
              <el-input v-model="queryParams.pinyin" placeholder="请输入姓名拼音" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="queryParams.mobile" placeholder="请输入手机号码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="电子邮件" prop="email">
              <el-input v-model="queryParams.email" placeholder="请输入电子邮件" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="queryParams.gender" placeholder="请选择性别" clearable >
                <el-option v-for="dict in sys_user_sex" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
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
            <el-form-item label="户籍" prop="placeOfOrigin">
              <el-input v-model="queryParams.placeOfOrigin" placeholder="请输入户籍" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="居住地" prop="address">
              <el-input v-model="queryParams.address" placeholder="请输入居住地" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="毕业学校" prop="graduationSchool">
              <el-input v-model="queryParams.graduationSchool" placeholder="请输入毕业学校" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="学历" prop="qualification">
              <el-input v-model="queryParams.qualification" placeholder="请输入学历" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="公司组织" prop="organization">
              <el-input v-model="queryParams.organization" placeholder="请输入公司组织" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="工作职务" prop="position">
              <el-input v-model="queryParams.position" placeholder="请输入工作职务" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="社会角色" prop="socialRole">
              <el-input v-model="queryParams.socialRole" placeholder="请输入社会角色" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最近接触时间" style="width: 308px">
              <el-date-picker
                v-model="dateRangeLastInteractionTime"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
              />
            </el-form-item>
            <el-form-item label="接触频率" prop="interactionFrequency">
              <el-select v-model="queryParams.interactionFrequency" placeholder="请选择接触频率" clearable >
                <el-option v-for="dict in ditalk_interaction_frequency" :key="dict.value" :label="dict.label" :value="dict.value"/>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['contact:info:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['contact:info:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['contact:info:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['contact:info:export']">导出</el-button>
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
        <el-table-column label="名字" align="center" prop="name" />
        <el-table-column label="昵称" align="center" prop="nickname" />
        <el-table-column label="姓名拼音" align="center" prop="pinyin" />
        <el-table-column label="手机号码" align="center" prop="mobile" />
        <el-table-column label="电子邮件" align="center" prop="email" />
        <el-table-column label="性别" align="center" prop="gender">
          <template #default="scope">
            <dict-tag :options="sys_user_sex" :value="scope.row.gender"/>
          </template>
        </el-table-column>
        <el-table-column label="生日" align="center" prop="birthday" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.birthday, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="户籍" align="center" prop="placeOfOrigin" />
        <el-table-column label="居住地" align="center" prop="address" />
        <el-table-column label="毕业学校" align="center" prop="graduationSchool" />
        <el-table-column label="学历" align="center" prop="qualification" />
        <el-table-column label="公司组织" align="center" prop="organization" />
        <el-table-column label="工作职务" align="center" prop="position" />
        <el-table-column label="社会角色" align="center" prop="socialRole" />
        <el-table-column label="描述" align="center" prop="description" />
        <el-table-column label="最近接触时间" align="center" prop="lastInteractionTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.lastInteractionTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="接触频率" align="center" prop="interactionFrequency">
          <template #default="scope">
            <dict-tag :options="ditalk_interaction_frequency" :value="scope.row.interactionFrequency"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['contact:info:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['contact:info:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改联系人对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="960px" append-to-body>
      <el-form ref="infoFormRef" :model="form" :rules="rules" label-width="120px">
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
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" placeholder="请输入名字" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="姓名拼音" prop="pinyin">
          <el-input v-model="form.pinyin" placeholder="请输入姓名拼音" />
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮件" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
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
        <el-form-item label="户籍" prop="placeOfOrigin">
          <el-input v-model="form.placeOfOrigin" placeholder="请输入户籍" />
        </el-form-item>
        <el-form-item label="居住地" prop="address">
          <el-input v-model="form.address" placeholder="请输入居住地" />
        </el-form-item>
        <el-form-item label="毕业学校" prop="graduationSchool">
          <el-input v-model="form.graduationSchool" placeholder="请输入毕业学校" />
        </el-form-item>
        <el-form-item label="学历" prop="qualification">
          <el-input v-model="form.qualification" placeholder="请输入学历" />
        </el-form-item>
        <el-form-item label="公司组织" prop="organization">
          <el-input v-model="form.organization" placeholder="请输入公司组织" />
        </el-form-item>
        <el-form-item label="工作职务" prop="position">
          <el-input v-model="form.position" placeholder="请输入工作职务" />
        </el-form-item>
        <el-form-item label="社会角色" prop="socialRole">
          <el-input v-model="form.socialRole" placeholder="请输入社会角色" />
        </el-form-item>
        <el-form-item label="描述">
          <editor v-model="form.description" :min-height="192"/>
        </el-form-item>
        <el-form-item label="最近接触时间" prop="lastInteractionTime">
          <el-date-picker clearable
            v-model="form.lastInteractionTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择最近接触时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="接触频率" prop="interactionFrequency">
          <el-select v-model="form.interactionFrequency" placeholder="请选择接触频率">
            <el-option
                v-for="dict in ditalk_interaction_frequency"
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
import { listInfo, getInfo, delInfo, addInfo, updateInfo } from '@/api/contact/info';
import { InfoVO, InfoQuery, InfoForm } from '@/api/contact/info/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_user_sex, ditalk_interaction_frequency, sys_normal_disable } = toRefs<any>(proxy?.useDict('sys_user_sex', 'ditalk_interaction_frequency', 'sys_normal_disable'));

const infoList = ref<InfoVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const dateRangeCreateTime = ref<[DateModelType, DateModelType]>(['', '']);
const dateRangeBirthday = ref<[DateModelType, DateModelType]>(['', '']);
const dateRangeLastInteractionTime = ref<[DateModelType, DateModelType]>(['', '']);

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
  name: undefined,
  nickname: undefined,
  pinyin: undefined,
  mobile: undefined,
  email: undefined,
  gender: undefined,
  birthday: undefined,
  placeOfOrigin: undefined,
  address: undefined,
  graduationSchool: undefined,
  qualification: undefined,
  organization: undefined,
  position: undefined,
  socialRole: undefined,
  description: undefined,
  lastInteractionTime: undefined,
  interactionFrequency: undefined
}
const data = reactive<PageData<InfoForm, InfoQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    id: undefined,
    state: undefined,
    name: undefined,
    nickname: undefined,
    pinyin: undefined,
    mobile: undefined,
    email: undefined,
    gender: undefined,
    placeOfOrigin: undefined,
    address: undefined,
    graduationSchool: undefined,
    qualification: undefined,
    organization: undefined,
    position: undefined,
    socialRole: undefined,
    interactionFrequency: undefined,
    params: {
      createTime: undefined,
      birthday: undefined,
      lastInteractionTime: undefined,
    }
  },
  rules: {
    id: [
      { required: true, message: "ID不能为空", trigger: "blur" }
    ],
    state: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
    name: [
      { required: true, message: "名字不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询联系人列表 */
const getList = async () => {
  loading.value = true;
  queryParams.value.params = {};
  proxy?.addDateRange(queryParams.value, dateRangeCreateTime.value, 'CreateTime');
  proxy?.addDateRange(queryParams.value, dateRangeBirthday.value, 'Birthday');
  proxy?.addDateRange(queryParams.value, dateRangeLastInteractionTime.value, 'LastInteractionTime');
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
  dateRangeBirthday.value = ['', ''];
  dateRangeLastInteractionTime.value = ['', ''];
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
  dialog.title = "添加联系人";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: InfoVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getInfo(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改联系人";
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
  await proxy?.$modal.confirm('是否确认删除联系人编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delInfo(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('contact/info/export', {
    ...queryParams.value
  }, `info_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
