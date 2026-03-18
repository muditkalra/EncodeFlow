FROM prom/prometheus:latest

COPY ../../prometheus/prometheus.ecs.yml /etc/prometheus/prometheus.yml

CMD [ "--config.file=/etc/prometheus/prometheus.yml", \
      "--storage.tsdb.path=/prometheus" ]