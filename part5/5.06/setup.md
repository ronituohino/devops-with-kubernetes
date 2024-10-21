https://knative.dev/docs/install/yaml-install/serving/install-serving-with-yaml/#prerequisites

### Core

```
kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.15.2/serving-crds.yaml
```

```
kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.15.2/serving-core.yaml
```

### Networking

```
kubectl apply -f https://github.com/knative/net-kourier/releases/download/knative-v1.15.1/kourier.yaml
```

```
kubectl patch configmap/config-network \
  --namespace knative-serving \
  --type merge \
  --patch '{"data":{"ingress-class":"kourier.ingress.networking.knative.dev"}}'
```

```
kubectl --namespace kourier-system get service kourier
```

### Verify installation

```
kubectl get pods -n knative-serving
```

### DNS!!! (curl)

```
kubectl patch configmap/config-domain \
      --namespace knative-serving \
      --type merge \
      --patch '{"data":{"example.com":""}}'
```

Start the hello world application:
https://knative.dev/docs/getting-started/first-service/#__tabbed_1_1

Then:

```
kubectl get ksvc
```

```
curl -H "Host: helloworld-go.default.example.com" localhost:8081
```