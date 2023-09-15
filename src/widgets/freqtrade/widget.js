import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
    api: "{url}/api/v1/{endpoint}",
    proxyHandler: genericProxyHandler,

    mappings: {
        trades: {
            endpoint: "trades",
        },
        status: {
            endpoint: "status",
        },
        count: {
            endpoint: "count",
        },
        profit: {
            endpoint: "profit",
        },
        performance: {
            endpoint: "performance",
        },
        balance: {
            endpoint: "balance",
        },
        daily: {
            endpoint: "daily",
        },
        stats: {
            endpoint: "stats",
        },
        version: {
            endpoint: "version",
        },
    },
};

export default widget;