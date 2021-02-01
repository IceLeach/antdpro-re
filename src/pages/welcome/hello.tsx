import React, { useRef } from 'react';
import { Button, Space, Tag, Menu, Dropdown } from 'antd';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import ProTable, {
  ActionType,
  ProColumns,
  TableDropdown,
} from '@ant-design/pro-table';
import { history, request } from 'umi';

interface GithubIssueItem {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: { name: string; color: string }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
}
const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'open',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: { text: '未解决', status: 'Error' },
      closed: { text: '已解决', status: 'Sucess' },
      processing: { text: '解决中', status: 'Processing' },
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'created_at',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actonGroup"
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];
const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

function Hello() {
  const actionRef = useRef<ActionType>();
  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) =>
          request<{ data: GithubIssueItem[] }>(
            'https://proapi.azurewebsites.net/github/issues',
            { params },
          )
        }
        editable={{ type: 'multiple' }}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 5 }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
          <Dropdown key="menu" overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      <Button
        onClick={() => {
          history.push('/welcome');
        }}
      >
        To Square
      </Button>
    </>
  );
}

export default Hello;
