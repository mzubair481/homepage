import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
    const { t } = useTranslation();

    const { widget } = service;

    const { data: tradesData, error: tradesError } = useWidgetAPI(widget, "trades", {
        refreshInterval: 5000,
    });
    const { data: statusData, error: statusError } = useWidgetAPI(widget, "status", {
        refreshInterval: 5000,
    });
    const { data: countData, error: countError } = useWidgetAPI(widget, "count", {
        refreshInterval: 5000,
    });
    const { data: profitData, error: profitError } = useWidgetAPI(widget, "profit", {
        refreshInterval: 5000,
    });
    const { data: performanceData, error: performanceError } = useWidgetAPI(widget, "performance", {
        refreshInterval: 5000,
    });
    const { data: balanceData, error: balanceError } = useWidgetAPI(widget, "balance", {
        refreshInterval: 5000,
    });
    const { data: dailyData, error: dailyError } = useWidgetAPI(widget, "daily", {
        refreshInterval: 5000,
    });

    const getStats = (data) => {
        const stats = {
            wins: 0,
            losses: 0,
            draws: 0,
        };
        Object.values(data.exit_reasons).forEach((item) => {
            stats.wins += item.wins;
            stats.losses += item.losses;
            stats.draws += item.draws;
        });
        return stats;
    };

    const { data: statsData, error: statsError } = useWidgetAPI(widget, "stats", {
        refreshInterval: 5000,
    });

    const totalWins = statsData ? getStats(statsData).wins : 0;
    const totalLosses = statsData ? getStats(statsData).losses : 0;
    // const totalDraws = statsData ? getStats(statsData).draws : 0;
    
    const { data: versionData, error: versionError } = useWidgetAPI(widget, "version", {
        refreshInterval: 5000,
    });

    if (tradesError || statusError || countError || profitError || performanceError || balanceError || dailyError || statsError || versionError) {
        const finalError = tradesError ?? statusError ?? countError ?? profitError ?? performanceError ?? balanceError ?? dailyError ?? statsError ?? versionError;
        return <Container error={finalError} />;
    }

    if (!tradesData || !statusData || !countData || !profitData || !performanceData || !balanceData || !dailyData || !statsData || !versionData) {
        return (
            <Container service={service}>
                <Block label="freqtrade.trades" />
                <Block label="freqtrade.status" />
                <Block label="freqtrade.count" />
                <Block label="freqtrade.profit" />
                <Block label="freqtrade.performance" />
                <Block label="freqtrade.balance" />
                <Block label="freqtrade.daily" />
                <Block label="freqtrade.stats" />
                <Block label="freqtrade.version" />
            </Container>
        );
    }

    return (
        <Container service={service}>
            <Block label="Total trades" value={t("common.number", { value: profitData.trade_count })} />
            <Block label="Closed trades" value={t("common.number", { value: profitData.closed_trade_count })} />
            {/* <Block label="freqtrade.status" value={t("common.number", { value: statusData })} /> */}
            {/* <Block label="freqtrade.count" value={t("common.number", { value: countData })} /> */}
            <Block label="Open profit" value={t("common.number", { value: profitData.profit_all_coin })} />
            <Block label="Closed profit" value={t("common.number", { value: profitData.profit_closed_coin })} />
            {/* <Block label="freqtrade.performance" value={t("common.number", { value: performanceData })} /> */}
            <Block label="Total balance" value={t("common.number", { value: balanceData.total })} />
            {/* <Block label="freqtrade.daily" value={t("common.number", { value: dailyData })} /> */}
            <Block label="Today profit" value={t("common.number", { value: dailyData.data[0].abs_profit })} />
            {/* TODO: add win loss draw */}
            <Block label="Total wins" value={t("common.number", { value: totalWins })} />
            {/* <Block label="Total draws" value={t("common.number", { value: totalDraws })} /> */}
            <Block label="Total losses" value={t("common.number", { value: totalLosses })} />
            {/* <Block label="freqtrade.version" value={t("common.number", { value: versionData.version })} /> */}
        </Container>
    );
}
