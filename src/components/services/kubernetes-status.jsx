import useSWR from "swr";
import { t } from "i18next";

export default function KubernetesStatus({ service }) {
  const podSelectorString = service.podSelector !== undefined ? `podSelector=${service.podSelector}` : "";
  const { data, error } = useSWR(`/api/kubernetes/status/${service.namespace}/${service.app}?${podSelectorString}`);

  if (error) {
    <div className="w-auto px-1.5 py-0.5 text-center bg-theme-500/10 dark:bg-theme-900/50 rounded-b-[3px] overflow-hidden k8s-status-error" title={t("docker.error")}>
      <div className="text-[8px] font-bold text-rose-500/80 uppercase">{t("docker.error")}</div>
    </div>
  }

  if (data && data.status === "running") {
    return (
      <div className="w-auto px-1.5 py-0.5 text-center bg-theme-500/10 dark:bg-theme-900/50 rounded-b-[3px] overflow-hidden k8s-status" title={data.health ?? data.status}>
        <div className="text-[8px] font-bold text-emerald-500/80 uppercase">{data.health ?? data.status}</div>
      </div>
    );
  }

  if (data && (data.status === "not found" || data.status === "down" || data.status === "partial")) {
    return (
      <div className="w-auto px-1.5 py-0.5 text-center bg-theme-500/10 dark:bg-theme-900/50 rounded-b-[3px] overflow-hidden k8s-status-warning" title={data.status}>
        <div className="text-[8px] font-bold text-orange-400/50 dark:text-orange-400/80 uppercase">{data.status}</div>
      </div>
    );
  }

  return (
    <div className="w-auto px-1.5 py-0.5 text-center bg-theme-500/10 dark:bg-theme-900/50 rounded-b-[3px] overflow-hidden k8s-status-unknown">
      <div className="text-[8px] font-bold text-black/20 dark:text-white/40 uppercase">{t("docker.unknown")}</div>
    </div>
  );
}
