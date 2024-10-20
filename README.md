# DevOps with Kubernetes

This is a submission repository for the course
[DevOps with Kubernetes](https://devopswithkubernetes.com/)!

[DBaaS vs DIY comparison](./part3/3.06/dbaas-vs-diy.md)

## Local

To avoid having to push encoded secrets to the repository, I've manually set the secrets to the cluster once it has been set up.

Note that the actual value for the secret has to be encoded with `base64`.

### Setting up

#### The cluster

```
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
kubectl cluster-info
```

Make persistent volumes work

```
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
```

Argo Rollouts

```
kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
```

Prometheus

```
kubectl create namespace prometheus
helm install prometheus-community/kube-prometheus-stack --generate-name --namespace prometheus
```

NATS

```
helm install --set auth.enabled=false my-nats oci://registry-1.docker.io/bitnamicharts/nats
helm upgrade --set metrics.enabled=true,auth.enabled=false my-nats oci://registry-1.docker.io/bitnamicharts/nats
```

Argo

```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

To login to Argo, port forward `argocd-server`  
Then, get password
```
kubectl get -n argocd secrets argocd-initial-admin-secret -o yaml
echo '<encoded pass>' | base64 --decode
```

Then, login  
```
admin
<pass>
```

### Ping Pong secrets

```
apiVersion: v1
kind: Secret
metadata:
  namespace: exercise
  name: pingpong-pg-password
data:
  PINGPONG_PG_PASSWORD: ...
```

### Project secrets

```
apiVersion: v1
kind: Secret
metadata:
  namespace: prod-project
  name: todo-api-pg-password
data:
  TODO_API_PG_PASSWORD: ...
---
apiVersion: v1
kind: Secret
metadata:
  namespace: prod-project
  name: discord-webhook-url
data:
  DISCORD_WEBHOOK_URL: ...
---
apiVersion: v1
kind: Secret
metadata:
  namespace: staging-project
  name: todo-api-pg-password
data:
  TODO_API_PG_PASSWORD: ...
```

### Local project

Create argo applications

```
kubectl apply -n argocd -f argo/
```

Create above secrets and apply them

```
kubectl apply -f secrets/
```

## GKE

### Starting up the cluster

```
gcloud container clusters create dwk-cluster --zone=europe-north1-b --cluster-version=1.29
```

### Removing the cluster

```
gcloud container clusters delete dwk-cluster --zone=europe-north1-b
```

### Misc

To make automatic database backups work in GKE, a Service Account token with
write privileges to the Object Store must be manually assigned to the cluster as
a secret to the `default` namespace.

```
name: gcloud-token
data:
 - TOKEN: ...
```
