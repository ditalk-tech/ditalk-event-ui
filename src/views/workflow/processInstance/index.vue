<template>
  <div class="p-2">
    <el-row :gutter="20">
      <!-- 流程分类树 -->
      <el-col :lg="4" :xs="24" style="">
        <el-card shadow="hover">
          <el-input v-model="categoryName" placeholder="请输入流程分类名" prefix-icon="Search" clearable />
          <el-tree
            ref="categoryTreeRef"
            class="mt-2"
            node-key="id"
            :data="categoryOptions"
            :props="{ label: 'label', children: 'children' } as any"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            highlight-current
            default-expand-all
            @node-click="handleNodeClick"
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :lg="20" :xs="24">
        <!--        <div class="mb-[10px]">
                  <el-card shadow="hover" class="text-center">
                    <el-radio-group v-model="tab" @change="changeTab(tab)">
                      <el-radio-button value="running">运行中</el-radio-button>
                      <el-radio-button value="finish">已完成</el-radio-button>
                    </el-radio-group>
                  </el-card>
                </div>-->
        <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
          <div v-show="showSearch" class="mb-[10px]">
            <el-card shadow="hover">
              <el-form v-show="showSearch" ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item>
                  <el-badge :value="userSelectCount" :max="10" class="item">
                    <el-button type="primary" @click="openUserSelect">选择申请人</el-button>
                  </el-badge>
                </el-form-item>
                <el-form-item label="任务名称" prop="nodeName">
                  <el-input v-model="queryParams.nodeName" placeholder="请输入任务名称" @keyup.enter="handleQuery" />
                </el-form-item>
                <el-form-item label="流程定义名称" label-width="100" prop="flowName">
                  <el-input v-model="queryParams.flowName" placeholder="请输入流程定义名称" @keyup.enter="handleQuery" />
                </el-form-item>
                <el-form-item label="流程定义编码" label-width="100" prop="flowCode">
                  <el-input v-model="queryParams.flowCode" placeholder="请输入流程定义编码" @keyup.enter="handleQuery" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                  <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </transition>
        <el-card shadow="hover">
          <template #header>
            <el-row :gutter="10" class="mb8">
              <el-col :span="1.5">
                <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete">删除</el-button>
              </el-col>
              <right-toolbar v-model:show-search="showSearch" @query-table="handleQuery"></right-toolbar>
            </el-row>
          </template>
          <el-tabs v-model="tab" @tab-click="changeTab">
            <el-tab-pane name="running" label="运行中"></el-tab-pane>
            <el-tab-pane name="finish" label="已完成"></el-tab-pane>
            <el-table v-loading="loading" border :data="processInstanceList" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" align="center" label="流程定义名称">
                <template #default="scope">
                  <span>{{ scope.row.flowName }}v{{ scope.row.version }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="nodeName" label="任务名称"></el-table-column>
              <el-table-column align="center" prop="flowCode" label="流程定义编码"></el-table-column>
              <el-table-column align="center" prop="categoryName" label="流程分类"></el-table-column>
              <el-table-column align="center" prop="createByName" label="申请人"></el-table-column>
              <el-table-column align="center" prop="version" label="版本号" width="90">
                <template #default="scope"> v{{ scope.row.version }}.0</template>
              </el-table-column>
              <el-table-column v-if="tab === 'running'" align="center" prop="isSuspended" label="状态" min-width="70">
                <template #default="scope">
                  <el-tag v-if="!scope.row.isSuspended" type="success">激活</el-tag>
                  <el-tag v-else type="danger">挂起</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" label="流程状态" min-width="70">
                <template #default="scope">
                  <dict-tag :options="wf_business_status" :value="scope.row.flowStatus"></dict-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="createTime" label="启动时间" width="160"></el-table-column>
              <el-table-column v-if="tab === 'finish'" align="center" prop="updateTime" label="结束时间" width="160"></el-table-column>
              <el-table-column label="操作" align="center" :width="165">
                <template #default="scope">
                  <el-row v-if="tab === 'running'" :gutter="10" class="mb8">
                    <el-col :span="1.5">
                      <el-popover :ref="`popoverRef${scope.$index}`" trigger="click" placement="left" :width="300">
                        <el-input v-model="deleteReason" resize="none" :rows="3" type="textarea" placeholder="请输入作废原因" />
                        <div style="text-align: right; margin: 5px 0px 0px 0px">
                          <el-button size="small" text @click="cancelPopover(scope.$index)">取消</el-button>
                          <el-button size="small" type="primary" @click="handleInvalid(scope.row)">确认</el-button>
                        </div>
                        <template #reference>
                          <el-button type="danger" size="small" icon="CircleClose">作废</el-button>
                        </template>
                      </el-popover>
                    </el-col>
                    <el-col :span="1.5">
                      <el-button type="danger" size="small" icon="Delete" @click="handleDelete(scope.row)">删除 </el-button>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                      <el-button type="primary" size="small" icon="View" @click="handleView(scope.row)">查看</el-button>
                    </el-col>
                    <el-col :span="1.5">
                      <el-button type="primary" size="small" icon="Document" @click="handleInstanceVariable(scope.row)"> 变量 </el-button>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="total > 0"
              v-model:page="queryParams.pageNum"
              v-model:limit="queryParams.pageSize"
              :total="total"
              @pagination="handleQuery"
            />
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-if="processDefinitionDialog.visible" v-model="processDefinitionDialog.visible" :title="processDefinitionDialog.title" width="70%">
      <el-table v-loading="loading" :data="processDefinitionHistoryList">
        <el-table-column fixed align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column fixed align="center" prop="name" label="流程定义名称"></el-table-column>
        <el-table-column fixed align="center" prop="nodeName" label="任务名称"></el-table-column>
        <el-table-column align="center" prop="key" label="标识Key"></el-table-column>
        <el-table-column align="center" prop="version" label="版本号" width="90">
          <template #default="scope"> v{{ scope.row.version }}.0</template>
        </el-table-column>
        <el-table-column align="center" prop="suspensionState" label="状态" min-width="70">
          <template #default="scope">
            <el-tag v-if="scope.row.suspensionState == 1" type="success">激活</el-tag>
            <el-tag v-else type="danger">挂起</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="deploymentTime" label="部署时间" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 流程变量开始 -->
    <el-dialog v-model="variableVisible" draggable title="流程变量" width="60%" :close-on-click-modal="false">
      <el-card v-loading="variableLoading" class="box-card">
        <template #header>
          <div class="clearfix">
            <span
              >流程定义名称：<el-tag>{{ processDefinitionName }}</el-tag></span
            >
          </div>
        </template>
        <div class="max-h-500px overflow-y-auto">
          <VueJsonPretty :data="formatToJsonObject(variables)" />
        </div>
      </el-card>
    </el-dialog>
    <!-- 流程变量结束 -->

    <!-- 申请人 -->
    <UserSelect ref="userSelectRef" :multiple="true" :data="selectUserIds" @confirm-call-back="userSelectCallBack"></UserSelect>
  </div>
</template>

<script setup lang="ts">
import { pageByRunning, pageByFinish, deleteByInstanceIds, instanceVariable, invalid } from '@/api/workflow/instance';
import { categoryTree } from '@/api/workflow/category';
import { CategoryTreeVO } from '@/api/workflow/category/types';
import { FlowInstanceQuery, FlowInstanceVO } from '@/api/workflow/instance/types';
import workflowCommon from '@/api/workflow/workflowCommon';
import { RouterJumpVo } from '@/api/workflow/workflowCommon/types';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import UserSelect from '@/components/UserSelect/index.vue';
//审批记录组件
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { wf_business_status } = toRefs<any>(proxy?.useDict('wf_business_status'));
const queryFormRef = ref<ElFormInstance>();
const categoryTreeRef = ref<ElTreeInstance>();
import { ref } from 'vue';
import { UserVO } from '@/api/system/user/types';

const userSelectRef = ref<InstanceType<typeof UserSelect>>();
// 遮罩层
const loading = ref(true);
// 选中数组
const ids = ref<Array<any>>([]);
// 选中实例id数组
const instanceIds = ref<Array<number | string>>([]);
// 非单个禁用
const single = ref(true);
// 非多个禁用
const multiple = ref(true);
// 显示搜索条件
const showSearch = ref(true);
// 总条数
const total = ref(0);

// 流程变量是否显示
const variableVisible = ref(false);
const variableLoading = ref(true);
const variables = ref<string>('');
//流程定义名称
const processDefinitionName = ref();
// 模型定义表格数据
const processInstanceList = ref<FlowInstanceVO[]>([]);
const processDefinitionHistoryList = ref<Array<any>>([]);
const categoryOptions = ref<CategoryOption[]>([]);
const categoryName = ref('');

const processDefinitionDialog = reactive<DialogOption>({
  visible: false,
  title: '流程定义'
});

type CategoryOption = {
  id: string;
  categoryName: string;
  children?: CategoryOption[];
};

const tab = ref('running');
// 作废原因
const deleteReason = ref('');

//申请人id
const selectUserIds = ref<Array<number | string>>([]);
//申请人选择数量
const userSelectCount = ref(0);
// 查询参数
const queryParams = ref<FlowInstanceQuery>({
  pageNum: 1,
  pageSize: 10,
  nodeName: undefined,
  flowName: undefined,
  flowCode: undefined,
  createByIds: [],
  category: undefined
});

/** 节点单击事件 */
const handleNodeClick = (data: CategoryTreeVO) => {
  queryParams.value.category = data.id;
  if (data.id === '0') {
    queryParams.value.category = '';
  }
  handleQuery();
};
/** 通过条件过滤节点  */
const filterNode = (value: string, data: any) => {
  if (!value) return true;
  return data.categoryName.indexOf(value) !== -1;
};
/** 根据名称筛选部门树 */
watchEffect(
  () => {
    categoryTreeRef.value.filter(categoryName.value);
  },
  {
    flush: 'post' // watchEffect会在DOM挂载或者更新之前就会触发，此属性控制在DOM元素更新后运行
  }
);

/** 查询流程分类下拉树结构 */
const getTreeselect = async () => {
  const res = await categoryTree();
  categoryOptions.value = res.data;
};

/** 搜索按钮操作 */
const handleQuery = () => {
  if ('running' === tab.value) {
    getProcessInstanceRunningList();
  } else {
    getProcessInstanceFinishList();
  }
};
/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  queryParams.value.category = '';
  queryParams.value.pageNum = 1;
  queryParams.value.pageSize = 10;
  queryParams.value.createByIds = [];
  userSelectCount.value = 0;
  handleQuery();
};
// 多选框选中数据
const handleSelectionChange = (selection: FlowInstanceVO[]) => {
  ids.value = selection.map((item: any) => item.id);
  instanceIds.value = selection.map((item: FlowInstanceVO) => item.id);
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
};
//分页
const getProcessInstanceRunningList = () => {
  loading.value = true;
  pageByRunning(queryParams.value).then((resp) => {
    processInstanceList.value = resp.rows;
    total.value = resp.total;
    loading.value = false;
  });
};
//分页
const getProcessInstanceFinishList = () => {
  loading.value = true;
  pageByFinish(queryParams.value).then((resp) => {
    processInstanceList.value = resp.rows;
    total.value = resp.total;
    loading.value = false;
  });
};

/** 删除按钮操作 */
const handleDelete = async (row: FlowInstanceVO) => {
  const instanceIdList = row.id || instanceIds.value;
  await proxy?.$modal.confirm('是否确认删除？');
  loading.value = true;
  if ('running' === tab.value) {
    await deleteByInstanceIds(instanceIdList).finally(() => (loading.value = false));
    getProcessInstanceRunningList();
  } else {
    await deleteByInstanceIds(instanceIdList).finally(() => (loading.value = false));
    getProcessInstanceFinishList();
  }
  proxy?.$modal.msgSuccess('删除成功');
};
const changeTab = async (data: string) => {
  processInstanceList.value = [];
  queryParams.value.pageNum = 1;
  if ('running' === data.paneName) {
    getProcessInstanceRunningList();
  } else {
    getProcessInstanceFinishList();
  }
};
/** 作废按钮操作 */
const handleInvalid = async (row: FlowInstanceVO) => {
  await proxy?.$modal.confirm('是否确认作废？');
  loading.value = true;
  if ('running' === tab.value) {
    const param = {
      id: row.id,
      comment: deleteReason.value
    };
    await invalid(param).finally(() => (loading.value = false));
    getProcessInstanceRunningList();
    proxy?.$modal.msgSuccess('操作成功');
  }
};
const cancelPopover = async (index: any) => {
  (proxy?.$refs[`popoverRef${index}`] as any).hide(); //关闭弹窗
};
/** 查看按钮操作 */
const handleView = (row) => {
  const routerJumpVo = reactive<RouterJumpVo>({
    businessId: row.businessId,
    taskId: row.id,
    type: 'view',
    formCustom: row.formCustom,
    formPath: row.formPath
  });
  workflowCommon.routerJump(routerJumpVo, proxy);
};

//查询流程变量
const handleInstanceVariable = async (row: FlowInstanceVO) => {
  variableLoading.value = true;
  variableVisible.value = true;
  processDefinitionName.value = row.flowName;
  const data = await instanceVariable(row.id);
  variables.value = data.data.variable;
  variableLoading.value = false;
};

/**
 * json转为对象
 * @param data 原始数据
 */
function formatToJsonObject(data: string) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}

//打开申请人选择
const openUserSelect = () => {
  userSelectRef.value.open();
};
//确认选择申请人
const userSelectCallBack = (data: UserVO[]) => {
  userSelectCount.value = 0;
  selectUserIds.value = [];
  queryParams.value.createByIds = [];

  if (data && data.length > 0) {
    userSelectCount.value = data.length;
    selectUserIds.value = data.map((item) => item.userId);
    queryParams.value.createByIds = selectUserIds.value;
  }
};
onMounted(() => {
  getProcessInstanceRunningList();
  getTreeselect();
});
</script>
