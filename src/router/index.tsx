import { lazy, Suspense, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import {
    HomeOutlined,
	UserOutlined,
    TeamOutlined,
    AuditOutlined,
    AlertOutlined,
    AccountBookOutlined,
    TagOutlined,
    FireOutlined,
    ShopOutlined,
    FileSearchOutlined,
    ProfileOutlined,
    ShoppingOutlined,
    FileDoneOutlined,
    AppstoreOutlined,
    VerifiedOutlined,
    UngroupOutlined,
    NotificationOutlined,
    AppstoreAddOutlined,
    PlusSquareOutlined,
    CalendarOutlined,
    SettingOutlined,
    FileExcelOutlined,
    ImportOutlined,
    ThunderboltOutlined,
    UserSwitchOutlined,
    RadarChartOutlined,
    MessageOutlined
} from '@ant-design/icons';
import { RouterType } from './type';
import Login from '@/view/other/login/index';

export const Home = lazy(() => import("@/view/home/index"))
const ProductManagementList = lazy(() => import("@/view/product-management/product-list/index"))
const ProductUpdate = lazy(() => import("@/view/product-management/product-update/index"))
const ProductSort = lazy(() => import("@/view/product-management/product-sort/index"))
const ProductAttr = lazy(() => import("@/view/product-management/product-attr/index"))
const ProductAttrList = lazy(() => import("@/view/product-management/product-attr/components/product-attr-list/index"))
const Brand = lazy(() => import("@/view/product-management/brand/index")) // 品牌


const OrderList = lazy(() => import("@/view/order-module/order-list/index"))
const OrderDetail = lazy(() => import("@/view/order-module/order-list/components/order-detail/index"))
const OrderSetting = lazy(() => import("@/view/order-module/order-setting/index"))
const ReturnApply = lazy(() => import("@/view/order-module/return-apply/index"))
const ReturnReason = lazy(() => import("@/view/order-module/return-reason/index"))



const SecondKill = lazy(() => import("@/view/marketing-module/second-kill/index"))
const KillTime = lazy(() => import("@/view/marketing-module/kill-time/index"))
const CouponList = lazy(() => import("@/view/marketing-module/coupon-list/index"))
const BrandRecommendation = lazy(() => import("@/view/marketing-module/brand-recommendation/index"))
const NewProductRecommendation = lazy(() => import("@/view/marketing-module/new-product-recommendation/index"))
const PopularRecommendation = lazy(() => import("@/view/marketing-module/popular-recommendation/index"))
const SpecialRecommendation = lazy(() => import("@/view/marketing-module/special-recommendation/index"))
const AdvertisingList = lazy(() => import("@/view/marketing-module/advertising-list/index"))

const UserAuthority = lazy(() => import("@/view/authority-module/user-authority/index"))
const CharactersAuthority = lazy(() => import("@/view/authority-module/characters-authority/index"))
const MenuAuthority = lazy(() => import("@/view/authority-module/menu-authority/index"))
const AssetsAuthority = lazy(() => import("@/view/authority-module/assets-authority/index"))
const ResourceCategory = lazy(() => import("@/view/authority-module/resource-category/index"))

const Stream = lazy(() => import("@/view/components-module/stream/index"))


// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode =>{
    return <Suspense fallback={<h1>Loading...</h1>}>
        {children}
    </Suspense>
  }
  

const router: RouterType[] = [
    // {
    //     path: '/',
    //     label: '',
    //     key: '/',
    //     icon: <HomeOutlined />,
    //     element: <Navigate to="/home" />,
    //     meta: {
    //         invisible: true,
    //         path: ['']
    //     }
    // },
    {
        path: '/login',
        label: '登录页',
        key: '/login',
        icon: <HomeOutlined />,
        element: <Login />,
        meta: {
            path: ['登录页']
        }
    },
    {
        path: '/home',
        label: '首页',
        key: '/home',
        icon: <HomeOutlined />,
        element: <Home />,
        meta: {
            path: ['首页']
        }
    },
    // 产品管理
    {
        path: '/product-management',
        label: '产品管理',
        key: '/product-management',
        icon: <ShoppingOutlined />,
        children: [
            {
                path: '/product-management/product-list',
                label: '产品列表',
                key: '/product-management/product-list',
                icon: <ProfileOutlined />,
                element: lazyLoad(<ProductManagementList />),
                meta: {
                    path: ['产品管理', '产品列表']
                }
            },
            {
                path: '/product-management/product-update',
                label: '商品详情',
                key: '/product-management/product-update',
                icon: <PlusSquareOutlined />,
                element: lazyLoad(<ProductUpdate />),
                meta: {
                    path: ['产品管理', '商品详情']
                }
            },
            {
                path: '/product-management/product-sort',
                label: '商品分类',
                key: '/product-management/product-sort',
                icon: <AppstoreAddOutlined />,
                element: lazyLoad(<ProductSort />),
                meta: {
                    path: ['产品管理', '商品分类']
                },
                
            },
            {
                path: '/product-management/product-attr',
                label: '商品类型',
                key: '/product-management/product-attr',
                icon: <CalendarOutlined />,
                element: lazyLoad(<ProductAttr />),
                meta: {
                    path: ['产品管理', '商品分类']
                }
            },
            {
                path: '/product-management/product-attr-list',
                label: '商品属性列表',
                key: '/product-management/product-attr-list',
                icon: <CalendarOutlined />,
                element: lazyLoad(<ProductAttrList />),
                meta: {
                    invisible: true,
                    path: ['产品管理', '商品属性']
                }
            },
            {
                path: '/product-management/brand',
                label: '品牌管理',
                key: '/product-management/brand',
                icon: <TagOutlined />,
                element: lazyLoad(<Brand />),
                meta: {
                    path: ['产品管理', '品牌管理']
                }
            },
        ],
        meta: {
            path: ['产品管理']
        }
    },
    // 订单管理
    {
        path: '/order-module',
        label: '订单管理',
        key: '/order-module',
        icon: <FileDoneOutlined />,
        children: [
            {
                path: '/order-module/order-list',
                label: '订单列表',
                key: '/order-module/order-list',
                icon: <ProfileOutlined />,
                element: lazyLoad(<OrderList />),
                meta: {
                    path: ['订单管理', '订单列表']
                },
            },
            {
                path: '/order-module/order-list/order-detail',
                label: '订单详情',
                key: '/order-module/order-list/order-detail',
                icon: <ProfileOutlined />,
                element: lazyLoad(<OrderDetail />),
                meta: {
                    path: ['订单管理', '订单详情']
                }
            },
            {
                path: '/order-module/order-setting',
                label: '订单设置',
                key: '/order-module/order-setting',
                icon: <SettingOutlined />,
                element: lazyLoad(<OrderSetting />),
                meta: {
                    path: ['订单管理', '订单设置']
                }
            },
            {
                path: '/order-module/return-apply',
                label: '退货原因设置',
                key: '/order-module/return-apply',
                icon: <ImportOutlined />,
                element: lazyLoad(<ReturnApply />),
                meta: {
                    path: ['订单管理', '退货申请处理']
                }
            },
            {
                path: '/order-module/return-reason',
                label: '退货原因设置',
                key: '/order-module/return-reason',
                icon: <FileExcelOutlined />,
                element: lazyLoad(<ReturnReason />),
                meta: {
                    path: ['订单管理', '退货原因设置']
                }
            }
        ],
        meta: {
            path: ['订单管理']
        }
    },
    // 营销模块
    {
        path: '/marketing-module',
        label: '营销模块',
        key: '/marketing-module',
        icon: <NotificationOutlined />,
        meta: {
            path: ['营销模块']
        },
        children: [
            {
                path: '/marketing-module/second-kill',
                label: '秒杀活动',
                key: '/marketing-module/second-kill',
                icon: <AlertOutlined />,
                element: lazyLoad(<SecondKill />),
                meta: {
                    path: ['营销模块', '秒杀活动']
                }
            },
            {
                path: '/marketing-module/kill-time',
                label: '秒杀时间段列表',
                key: '/marketing-module/kill-time',
                icon: <ThunderboltOutlined />,
                element: lazyLoad(<KillTime />),
                meta: {
                    path: ['营销模块', '秒杀时间段列表']
                }
            },
            {
                path: '/marketing-module/coupon-list',
                label: '优惠券列表',
                key: '/marketing-module/coupon-list',
                icon: <AccountBookOutlined />,
                element: lazyLoad(<CouponList />),
                meta: {
                    path: ['营销模块', '优惠券列表']
                }
            },
            {
                path: '/marketing-module/brand-recommendation',
                label: '品牌推荐',
                key: '/marketing-module/brand-recommendation',
                icon: <TagOutlined />,
                element: lazyLoad(<BrandRecommendation />),
                meta: {
                    path: ['营销模块', '品牌推荐']
                }
            },
            {
                path: '/marketing-module/new-product-recommendation',
                label: '新品推荐',
                key: '/marketing-module/new-product-recommendation',
                icon: <ShopOutlined />,
                element: lazyLoad(<NewProductRecommendation />),
                meta: {
                    path: ['营销模块', '新品推荐']
                }
            },
            {
                path: '/marketing-module/popular-recommendation',
                label: '人气推荐',
                key: '/marketing-module/popular-recommendation',
                icon: <FireOutlined />,
                element: lazyLoad(<PopularRecommendation />),
                meta: {
                    path: ['营销模块', '人气推荐']
                }
            },
            {
                path: '/marketing-module/special-recommendation',
                label: '专题推荐',
                key: '/marketing-module/special-recommendation',
                icon: <FileSearchOutlined />,
                element: lazyLoad(<SpecialRecommendation />),
                meta: {
                    path: ['营销模块', '专题推荐']
                }
            },
            {
                path: '/marketing-module/advertising-list',
                label: '广告列表',
                key: '/marketing-module/advertising-list',
                icon: <ProfileOutlined />,
                element: lazyLoad(<AdvertisingList />),
                meta: {
                    path: ['营销模块', '广告列表']
                }
            }
        ]
    },
    // 权限模块
    {
        path: '/authority-module',
        label: '权限模块',
        key: '/authority-module',
        icon: <VerifiedOutlined />,
        meta: {
            path: ['权限模块']
        },
        children: [
            {
                path: '/authority-module/user-authority',
                label: '用户列表',
                key: '/authority-module/user-authority',
                icon: <UserOutlined />,
                element: lazyLoad(<UserAuthority />),
                meta: {
                    path: ['权限模块', '用户列表']
                }
            },
            {
                path: '/authority-module/characters-authority',
                label: '角色列表',
                key: '/authority-module/characters-authority',
                icon: <TeamOutlined />,
                element: lazyLoad(<CharactersAuthority />),
                meta: {
                    path: ['权限模块', '角色列表']
                }
            },
            {
                path: '/authority-module/menu-authority',
                label: '菜单列表',
                key: '/authority-module/menu-authority',
                icon: <AppstoreOutlined />,
                element: lazyLoad(<MenuAuthority />),
                meta: {
                    path: ['权限模块', '菜单列表']
                }
            },
            {
                path: '/authority-module/assets-authority',
                label: '资源列表',
                key: '/authority-module/assets-authority',
                icon: <UngroupOutlined />,
                element: lazyLoad(<AssetsAuthority />),
                meta: {
                    path: ['权限模块', '资源列表']
                }
            },
            {
                path: '/authority-module/resource-category',
                label: '资源分类',
                key: '/authority-module/resource-category',
                icon: <UngroupOutlined />,
                element: lazyLoad(<ResourceCategory />),
                meta: {
                    path: ['权限模块', '资源分类']
                }
            }
        ]
    },
    // 组件模块
    {
        path: '/component-module',
        label: '组件模块',
        key: '/component-module',
        icon: <RadarChartOutlined />,
        meta: {
            path: ['组件模块']
        },
        children: [
            {
                path: '/component-module/stream',
                label: '消息流',
                key: '/component-module/stream',
                icon: <MessageOutlined />,
                element: lazyLoad(<Stream />),
                meta: {
                    path: ['组件模块', '消息流']
                }
            }
        ]
    }
]

// 筛选排除 invisible: true
export function filterMenu(arr: RouterType[]): RouterType[] {
    const list = arr && arr.filter((menu: RouterType) => {
        if (menu.meta && menu.meta.invisible) {
            return;
          } else if (menu.children && menu.children.length) {
            return filterMenu(menu.children);
          } else {
            return menu;
          }
    })
    return list;
}


export {
    router
};
  
